import passport from 'passport';
import { find_User_By_Id } from '../DAO/User_DAO.js';
export function init_Passport() {
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await find_User_By_Id(id);
            done(null, user ?? false);
        }
        catch (error) {
            done(error);
        }
    });
}
