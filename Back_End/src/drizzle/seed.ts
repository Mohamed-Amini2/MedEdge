import "dotenv/config";
import { userDao } from "../DAO/Auth/auth_dao.js";
import { hashPassword } from "../security/password.crypto.js";
import { client } from "../db/db.js";

const email = (process.env.DEMO_EMAIL || "demo@mededge.app").toLowerCase();
const password = process.env.DEMO_PASSWORD || "MedEdge2026";

async function main() {
  const existing = await userDao.findByEmail(email);
  if (existing) {
    console.log(`Demo account already exists: ${email}`);
    return;
  }

  const user = await userDao.create({
    email,
    passwordHash: await hashPassword(password, 1),
    passwordPepperVersion: 1,
    phoneNumber: "+70000000001",
    dateOfBirth: "2000-01-01",
    name: "Demo Patient",
  });
  await userDao.verifyEmail(user.id);
  console.log(`Demo account created: ${email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => client.end());
