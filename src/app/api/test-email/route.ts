import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET() {
  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
  const toEmail = process.env.EMAIL_TO || process.env.CONTACT_EMAIL;
  const fromEmail = process.env.EMAIL_FROM || 'noreply@stroykomplekt-msk.ru';
  
  if (!resend) {
    return NextResponse.json(
      { 
        ok: false, 
        configured: false,
        error: 'RESEND_API_KEY is not configured',
        env: {
          RESEND_API_KEY: !!process.env.RESEND_API_KEY,
          EMAIL_TO: !!process.env.EMAIL_TO,
          EMAIL_FROM: !!process.env.EMAIL_FROM,
          NODE_ENV: process.env.NODE_ENV,
        }
      },
      { status: 500 }
    );
  }

  if (!toEmail) {
    return NextResponse.json(
      { 
        ok: false, 
        configured: false,
        error: 'No recipient email address configured (EMAIL_TO or CONTACT_EMAIL)',
        env: {
          EMAIL_TO: !!process.env.EMAIL_TO,
          CONTACT_EMAIL: !!process.env.CONTACT_EMAIL,
        }
      },
      { status: 500 }
    );
  }

  try {
    // Test sending an email
    const testEmail = {
      from: `Test Email <${fromEmail}>`,
      to: toEmail,
      subject: 'Test Email from Stroykomplekt',
      text: 'This is a test email to verify email sending is working correctly.',
    };

    const { data, error } = await resend.emails.send(testEmail);

    if (error) {
      return NextResponse.json(
        { 
          ok: false, 
          configured: true,
          error: 'Failed to send test email',
          details: error,
          env: {
            RESEND_API_KEY: '***' + (process.env.RESEND_API_KEY || '').slice(-4),
            EMAIL_TO: toEmail,
            EMAIL_FROM: fromEmail,
            NODE_ENV: process.env.NODE_ENV,
          }
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      configured: true,
      message: 'Test email sent successfully',
      emailId: data?.id,
      env: {
        RESEND_API_KEY: '***' + (process.env.RESEND_API_KEY || '').slice(-4),
        EMAIL_TO: toEmail,
        EMAIL_FROM: fromEmail,
        NODE_ENV: process.env.NODE_ENV,
      }
    });
  } catch (error) {
    console.error('Error in test email endpoint:', error);
    return NextResponse.json(
      { 
        ok: false, 
        configured: true,
        error: 'Error sending test email',
        details: error instanceof Error ? error.message : String(error),
        env: {
          RESEND_API_KEY: '***' + (process.env.RESEND_API_KEY || '').slice(-4),
          EMAIL_TO: toEmail,
          EMAIL_FROM: fromEmail,
          NODE_ENV: process.env.NODE_ENV,
        }
      },
      { status: 500 }
    );
  }
}

// Prevent other HTTP methods
export function POST() {
  return new NextResponse('Method not allowed', { status: 405 });
}
