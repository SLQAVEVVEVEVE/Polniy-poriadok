import * as brevo from '@getbrevo/brevo';
import { TransactionalEmailsApi, SendSmtpEmail, SendSmtpEmailSender } from '@getbrevo/brevo';

// Extend the error type to include response
interface BrevoError extends Error {
  response?: {
    status: number;
    [key: string]: any;
  };
}

type SendEmailParams = {
  name: string;
  phone: string;
  message?: string;
  sourcePage?: string;
};

const RETRY_ATTEMPTS = 3;
const RETRY_DELAYS = [250, 500, 1000]; // ms

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Europe/Moscow',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date);
}

async function withRetry<T>(
  fn: () => Promise<T>,
  attempts: number,
  delays: number[]
): Promise<T> {
  let lastError: unknown;
  
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (error: unknown) {
      const brevoError = error as BrevoError;
      lastError = error;
      const statusCode = brevoError.response?.status;
      
      // Only retry on network errors or 5xx errors
      if (statusCode && statusCode < 500) {
        throw error;
      }
      
      if (i < attempts - 1) {
        const delay = delays[Math.min(i, delays.length - 1)];
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}

export async function sendLeadEmail({
  name,
  phone,
  message = '',
  sourcePage = 'Не указана'
}: SendEmailParams): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY;
  const emailFrom = process.env.EMAIL_FROM;
  const emailFromName = process.env.EMAIL_FROM_NAME || 'Сайт';
  const emailTo = process.env.EMAIL_TO;
  const timestamp = formatDate(new Date());

  // Check if all required environment variables are set
  if (!apiKey || !emailFrom || !emailTo) {
    console.warn('Missing required environment variables for email sending. Running in mock mode.');
    console.log('Would send email with data:', { name, phone, message, sourcePage, timestamp });
    return true; // Return true in mock mode to simulate success
  }

  // Initialize Brevo API client
  const apiInstance = new TransactionalEmailsApi();
  apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);

  // Prepare email content
  const subject = 'Новая заявка с сайта';
  
  const textContent = `
    Новая заявка с сайта
    =====================
    
    Имя: ${name}
    Телефон: ${phone}
    ${message ? `Сообщение: ${message}\n` : ''}
    Дата/время (MSK): ${timestamp}
    Страница-источник: ${sourcePage}
  `;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a365d;">Новая заявка с сайта</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Имя</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Телефон</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${phone}</td>
        </tr>
        ${message ? `
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; vertical-align: top;">Сообщение</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0; white-space: pre-line;">${message}</td>
        </tr>` : ''}
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Дата/время (MSK)</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${timestamp}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Страница-источник</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${sourcePage}</td>
        </tr>
      </table>
    </div>
  `;

  const sendSmtpEmail: SendSmtpEmail = {
    sender: { email: emailFrom, name: emailFromName },
    to: [{ email: emailTo }],
    subject,
    textContent: textContent.trim(),
    htmlContent
  };

  try {
    await withRetry(
      () => apiInstance.sendTransacEmail(sendSmtpEmail),
      RETRY_ATTEMPTS,
      RETRY_DELAYS
    );
    return true;
  } catch (error) {
    console.error('Error sending email via Brevo:', error);
    return false;
  }
}
