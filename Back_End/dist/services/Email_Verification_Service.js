import { Create_Verification_code, Find_Valid_Verification_Code, Mark_Verification_Code_Used, Delete_Old_Verification_Codes } from '../DAO/Email_Verification_DAO.js';
import { Email_Service } from './Email_Service.js';
function Generate_Verification_Code() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
export class Verification_Service {
    static async Send_Verification_Code(email, name) {
        await Delete_Old_Verification_Codes(email);
        const code = Generate_Verification_Code();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        await Create_Verification_code(code, email, expiresAt);
        await Email_Service.Send_Verification_Email({ email, code, name });
    }
    static async Verify_Code(email, code) {
        const verificationCode = await Find_Valid_Verification_Code(email, code);
        if (!verificationCode) {
            return false;
        }
        await Mark_Verification_Code_Used(verificationCode.id);
        return true;
    }
}
