import { Resend } from 'resend';

interface Send_Verification_Email_Params {
  name?: string;
  code: string;
  email: string;
}

export class Email_Service {
  static isConfigured(): boolean {
    return !!process.env.RESEND_API_KEY;
  }

  static async Send_Verification_Email(params: Send_Verification_Email_Params): Promise<boolean> {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return false;

    const resend = new Resend(apiKey);
    const from = process.env.EMAIL_FROM || 'MedEdge <onboarding@resend.dev>';
    const { email, code, name } = params;

    try {
      const result = await resend.emails.send({
        from,
        to: email,
        subject: 'Verify your MedEdge Account',
        html: `<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #ea580c; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0;">MedEdge</h1>
      </div>
      <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
        <h2>Hello${name ? ` ${name}` : ''}!</h2>
        <p>Use the code below to verify your email:</p>
        <div style="background: white; border: 2px solid #ea580c; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
          <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #ea580c;">${code}</div>
        </div>
        <p>This code expires in 10 minutes. If you did not request it, ignore this email.</p>
      </div>
    </div>
  </body>
</html>`,
      });
      if (result.error) {
        console.error('Resend rejected the email:', result.error);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Failed to send verification email:', error);
      return false;
    }
  }
}
