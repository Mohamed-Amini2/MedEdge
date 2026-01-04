import { Resend} from 'resend'

console.log('Resend API Key exists:', !!process.env.RESEND_API_KEY);
const resend = new Resend(process.env.RESESND_API_KEY)


interface Send_Verification_Email_Params {
    name?: string;
    code: string;
    email: string;
}

interface Send_Welcome_Msg {
    name?: string;
    email: string;
}
export class Email_Service{

    
static async Send_Verification_Email(params: Send_Verification_Email_Params): Promise<void> {
  const { email, code, name } = params;

  try {
      console.log('🔄 Attempting to send email to:', email);  
      
      const result = await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: email,
          subject: 'Verify your MedEdge Account',
          html:`<!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #ea580c ; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                .header h1 { color: white; margin: 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
                .code-box { background: white; border: 2px solid #ea580c; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; }
                .code { font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #ea580c; }
                .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>MedEdge</h1>
                </div>
                <div class="content">
                  <h2>Hello${name ? ` ${name}` : ''}!</h2>
                  <p>Thank you for signing up with MedEdge. Please use the verification code below to complete your registration:</p>
                  
                  <div class="code-box">
                    <div class="code">${code}</div>
                  </div>
                  
                  <p>This code will expire in 10 minutes.</p>
                  <p>If you didn't request this code, please ignore this email.</p>
                </div>
                <div class="footer">
                  <p>© ${new Date().getFullYear()} MedEdge. All rights reserved.</p>
                </div>
              </div>
            </body>
          </html>
                `
      });
      
      console.log('Email sent successfully:', result); 
      
  } catch(error) {
      console.error('Failed to send Verification email:', error);  
      throw new Error('Failed to send verification email');
  }
}

static async Send_Welcome_Email(email: string, name: string): Promise<void>{
    try{
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Welcome to MedEdge!',
            html:`
          <!DOCTYPE html>
          <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #ea580c;">Welcome to MedEdge, ${name}!</h1>
                <p>We're excited to have you on board.</p>
                <p>Your account has been successfully verified and you can now access all features.</p>
                <p>Best regards,<br>The MedEdge Team</p>
              </div>
            </body>
          </html>
        `
        })
    }catch(error){
        console.error('Failed to send welcome email' , error)
    }
}
}