import passport from 'passport'
import  {users}  from '../drizzle/schema.js'
import { userDao } from '../DAO/Auth/auth_dao.js'

export function init_Passport() {
    passport.serializeUser((user: typeof users , done ) => done(null , user.id));

    passport.deserializeUser(async (id: string, done) => {
        try {
            const user = await userDao.findById(id);
            done(null , user ?? false)
        } catch (error) {
            done(error as Error)
        }
    });
}