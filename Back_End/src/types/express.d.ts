import { Db_User } from "../drizzle/schema.ts";

declare global {
    namespace Express {
        interface User extends Db_User{}
    }
}

export {};

//* well now When we want to use req.user we use now Express.User == my Db_User so now we wont use the any type     