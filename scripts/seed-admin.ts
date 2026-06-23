import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import * as readline from "readline";

config({ path: ".env.local" });

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q: string): Promise<string> => new Promise((res) => rl.question(q, res));

async function main() {
  const db_url = process.env.DATABASE_URL;
  if (!db_url) {
    console.error("❌  DATABASE_URL not set. Run: export $(cat .env.local | grep DATABASE_URL | xargs)");
    process.exit(1);
  }

  console.log("\n🔐  Armooh-Williams Admin Setup\n");

  const name = await ask("Admin name:      ");
  const email = await ask("Admin email:     ");
  const password = await ask("Admin password:  ");

  if (!name || !email || !password) {
    console.error("❌  All fields are required.");
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("❌  Password must be at least 8 characters.");
    process.exit(1);
  }

  rl.close();

  const hash = await bcrypt.hash(password, 12);
  const sql = neon(db_url);

  await sql`
    INSERT INTO admin_users (email, name, password_hash)
    VALUES (${email}, ${name}, ${hash})
    ON CONFLICT (email) DO UPDATE SET name = ${name}, password_hash = ${hash}
  `;

  console.log(`\n✅  Admin user "${name}" (${email}) created/updated.\n`);
  console.log("   You can now sign in at /admin/login\n");
}

main().catch((e) => { console.error(e); process.exit(1); });
