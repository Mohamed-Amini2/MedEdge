import passport from 'passport'
import { Db_User } from '../drizzle/schema.js'
import { find_User_By_Id } from '../DAO/User_DAO.js'

export function init_Passport() {
    passport.serializeUser((user: Db_User , done ) => done(null , user.id));

    passport.deserializeUser(async (id: string, done) => {
        try {
            const user = await find_User_By_Id(id);
            done(null , user ?? false)
        } catch (error) {
            done(error as Error)
        }
    });
}