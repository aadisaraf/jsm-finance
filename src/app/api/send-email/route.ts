import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, loanType } = await request.json();

    if (!phoneNumber || !loanType) {
      return NextResponse.json(
        { error: 'Phone number and loan type are required' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'JSM Finance <onboarding@resend.dev>', // You'll need to verify your domain or use the default
      to: ['jsmfinance777@gmail.com'],
      subject: `New Loan Application - ${loanType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #8B4513; margin-bottom: 10px;">JSM Finance</h1>
            <h2 style="color: #333; margin: 0;">New Loan Application</h2>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">Application Details:</h3>
            <p style="margin: 10px 0;"><strong>Loan Type:</strong> ${loanType}</p>
            <p style="margin: 10px 0;"><strong>Phone Number:</strong> ${phoneNumber}</p>
            <p style="margin: 10px 0;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p style="margin: 10px 0;"><strong>Time:</strong> ${new Date().toLocaleTimeString()}</p>
          </div>
          
          <div style="background-color: #FFC19F; padding: 15px; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #333;">
              <strong>Next Steps:</strong> Please contact the customer at the provided phone number to discuss their ${loanType.toLowerCase()} requirements.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 14px; margin: 0;">
              This email was sent from the JSM Finance website contact form.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully', data }, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
