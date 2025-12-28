import {pool} from "./index.js";

const truncateTables = async () => {
 try {
  await pool.query(`
    TRUNCATE TABLE 
      help_commands,
      help_docs
    RESTART IDENTITY CASCADE
  `);

  console.log(`TRUNCATE TABLE berhasil`);
 } catch (e) {
   console.error("TRUNCATE TABLE gagal ", e);
 } finally {
   await pool.end();
 }
};

truncateTables();