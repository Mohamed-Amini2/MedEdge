import {
  Create_Verification_code,
  Find_Valid_Verification_Code,
  Mark_Verification_Code_Used,
  Delete_Old_Verification_Codes,
} from '../../DAO/Email_Verification_DAO.js';
import { Email_Service } from './Email_Service.js';
import { generate6DigitOtp, hashOtp } from '../../security/opt.crypto.js';
import { HttpError } from '../../utils/http_Error.js';

const PURPOSE = 'email_verification';

export class Verification_Service {
  static async Send_Verification_Code(user: { id: string; email: string; name?: string }): Promise<{ devOtp?: string }> {
    const demoMode = process.env.DEMO_MODE !== 'false';

    await Delete_Old_Verification_Codes(user.email);

    const code = generate6DigitOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await Create_Verification_code(hashOtp(user.id, PURPOSE, code), user.email, expiresAt);

    const emailed = await Email_Service.Send_Verification_Email({ email: user.email, code, name: user.name });
    console.log(`[OTP] ${user.email}: ${code} (emailed: ${emailed})`);

    if (emailed) return {};
    if (!demoMode) throw new HttpError(502, 'Could not send the verification email');
    return { devOtp: code };
  }

  static async Verify_Code(user: { id: string; email: string }, code: string): Promise<boolean> {
    const row = await Find_Valid_Verification_Code(user.email, hashOtp(user.id, PURPOSE, code));
    if (!row) return false;
    await Mark_Verification_Code_Used(row.id);
    return true;
  }
}
