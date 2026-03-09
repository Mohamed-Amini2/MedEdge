import * as argon2 from "argon2";

function getPasswordPepper(version: number): string {
  const pepper = process.env.PEPPER_PASSWORD;

  if (!pepper) {
    throw new Error("PEPPER_PASSWORD is missing");
  }
  return pepper;
}

export async function hashPassword(password: string, pepperVersion = 1) {
  const pepper = getPasswordPepper(pepperVersion);

  const pwd = `${pepperVersion}:${password}:${pepper}`;

  return argon2.hash(pwd, {
    type: argon2.argon2id,
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
  });
}

export async function verifyPassword(
  hash: string,
  password: string,
  pepperVersion = 1
) {
  const pepper = getPasswordPepper(pepperVersion);

  const pwd = `${pepperVersion}:${password}:${pepper}`;

  return argon2.verify(hash, pwd);
}