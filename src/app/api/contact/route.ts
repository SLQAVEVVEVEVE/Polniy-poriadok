import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import rateLimit from '@/lib/rate-limit';
import { getClientIp } from '@/lib/ip-utils';

// Simple form validation schema
const contactFormSchema = {
  safeParse: (data: any) => {
    // Basic validation
    const errors: Record<string, string[]> = {};
    if (!data.name?.trim()) errors.name = ['Укажите ваше имя'];
    if (!data.phone?.trim()) errors.phone = ['Укажите ваш телефон'];
    
    if (Object.keys(errors).length > 0) {
      return { 
        success: false,
        error: { 
          errors,
          name: 'ValidationError',
          message: 'Проверьте правильность заполнения полей'
        }
      };
    }
    
    return { 
      success: true, 
      data: {
        name: String(data.name || '').trim(),
        email: String(data.email || '').trim(),
        phone: String(data.phone || '').trim(),
        message: String(data.message || 'Заявка с главной страницы').trim()
      }
    };
  }
};

// Initialize Resend if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Local rate limiting configuration (acts as a fallback to middleware)
const localRateLimiter = rateLimit({
  interval: 10 * 60 * 1000, // 10 minutes
  uniqueTokenPerInterval: 1000,
});

const LOCAL_RATE_LIMIT = 5; // 5 requests per window

// Get client IP from request headers
function getRequestIp(request: Request): string {
  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim();
  }
  return 'unknown';
}

export async function POST(request: Request) {
  // Skip rate limiting if disabled via env var
  if (process.env.RATE_LIMIT_DISABLED !== 'true') {
    // Apply local rate limiting (as a fallback to middleware)
    const ip = getRequestIp(request);
    const rateLimitResult = await localRateLimiter.check(ip);

    if (!rateLimitResult.success) {
      const retryAfter = Math.ceil((rateLimitResult.resetTime.getTime() - Date.now()) / 1000);
      return new Response(
        JSON.stringify({ 
          ok: false, 
          reason: 'rate_limited',
          message: 'Too many requests, please try again later.'
        }), 
        { 
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': Math.floor(rateLimitResult.resetTime.getTime() / 1000).toString(),
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }
  }

  try {
    const body = await request.json();
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { 
          ok: false, 
          reason: 'validation_error',
          message: 'Неверные данные формы',
          errors: result.error?.errors || {}
        },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    const formData = result.data;
    if (!formData) {
      return NextResponse.json(
        { ok: false, reason: 'invalid_data', message: 'Invalid form data' },
        { status: 400 }
      );
    }
    
    const { name, phone, email, message } = formData;

    // Only send email if Resend is initialized
    if (resend) {
      const toEmail = process.env.EMAIL_TO || process.env.CONTACT_EMAIL || 'info@example.com';
      const fromEmail = process.env.EMAIL_FROM || 'noreply@stroykomplekt-msk.ru';
      
      if (!toEmail) {
        console.error('No recipient email address configured');
        return NextResponse.json(
          { 
            ok: false, 
            reason: 'email_error',
            message: 'Настройки почтового сервера не настроены' 
          },
          { 
            status: 500,
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }

      try {
        const { error } = await resend.emails.send({
          from: `Сайт Стройкомплект <${fromEmail}>`,
          to: toEmail,
          subject: `Новая заявка с сайта от ${name}`,
          text: `
            Имя: ${name}
            Телефон: ${phone}
            Email: ${email}
            Сообщение: ${message || 'Не указано'}
          `,
        });

        if (error) {
          console.error('Error sending email:', error);
          return NextResponse.json(
            { 
              ok: false, 
              reason: 'email_error',
              message: 'Ошибка при отправке сообщения' 
            },
            { 
              status: 500,
              headers: {
                'Access-Control-Allow-Origin': '*',
              },
            }
          );
        }
      } catch (emailError) {
        console.error('Error in email sending process:', emailError);
        return NextResponse.json(
          { 
            ok: false, 
            reason: 'email_error',
            message: 'Произошла ошибка при отправке сообщения' 
          },
          { 
            status: 500,
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }
    } else {
      console.log('Email sending skipped - Resend not initialized');
      // In development or when Resend is not configured, log the form submission
      console.log('Form submission:', { name, email, phone, message });
    }

    const response = NextResponse.json({ 
      ok: true, 
      message: 'Сообщение успешно отправлено' 
    });
    
    // Set CORS headers
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      JSON.stringify({ 
        ok: false, 
        reason: 'server_error',
        message: 'Произошла ошибка при обработке запроса' 
      }), 
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' 
        } 
      }
    );
  }
}

// Prevent GET requests
export async function GET() {
  return new NextResponse('Method not allowed', { status: 405 });
}
