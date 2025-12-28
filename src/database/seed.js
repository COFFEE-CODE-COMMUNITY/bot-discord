import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "./index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runSeed = async () => {
  const seedDir = path.join(__dirname, "../seeds");

  const files = fs
    .readdirSync(seedDir)
    .filter(file => file.endsWith(".js"));

  for (const file of files) {
    console.log(`Menjalankan seed: ${file}`);

    const seed = await import(path.join(seedDir, file));

    if (typeof seed.default === "function") {
      await seed.default();
    } else {
      console.warn(`${file} tidak memiliki default export`);
    }
  }

  await pool.end();
};

runSeed();
