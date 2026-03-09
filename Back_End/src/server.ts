import * as dotenv from 'dotenv'
import { verifyDatabaseConnection } from './config/dbCon_Verfication.js';
import { Create_App } from "./app.js";import cors from 'cors'
// import { init_Passport } from './config/Passport.config.js';
import { Connect_Redis } from './redis/redis.js';


await Connect_Redis();
// init_Passport();

dotenv.config();


console.log(Connect_Redis)

const app = Create_App();
const PORT = process.env.PORT_SERVER || '3000'


const ServerStart = async () => {
    const isDbConnected = await verifyDatabaseConnection();

    
    try{

        if(!isDbConnected){
            console.error('The Database Server has failed to start:(')
        }


        app.listen(parseInt(PORT), '0.0.0.0' , ()=>{
                console.log(`The server is working Fine localhost:${PORT}`)
                console.log(`Database Is connected without An Error`)
        })
    }catch(e) {
        console.log(`There was an Error ${e}`)
    }
}

ServerStart();