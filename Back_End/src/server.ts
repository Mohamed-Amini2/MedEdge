import "dotenv/config";
import { verifyDatabaseConnection } from "./config/dbCon_Verfication.js";
import { Create_App } from "./app.js";
import { init_Passport } from "./config/Passport.config.js";
import { Connect_Redis } from "./redis/redis.js";

await Connect_Redis();
init_Passport();

const app = Create_App();
const PORT = process.env.PORT || process.env.PORT_SERVER || "3000";

const isDbConnected = await verifyDatabaseConnection();
if (!isDbConnected) {
  console.error("The database is not reachable, check DATABASE_URL");
  process.exit(1);
}

app.listen(parseInt(PORT), "0.0.0.0", () => {
  console.log(`MedEdge server is running on port ${PORT}`);
});
