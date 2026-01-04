import { client } from "../db/db.js";
export async function verifyDatabaseConnection() {
    try {
        await client `SELECT 1`;
        console.log('Database connection verified successfully');
        return true;
    }
    catch (error) {
        console.error('Database connection failed:', error);
        return false;
    }
}
