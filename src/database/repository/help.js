import {pool} from "../index.js";

const createHelp = async ({ data }) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    for (const item of data) {
      const commandResult = await client.query(
        `
        INSERT INTO help_commands (command, description, sub_commands)
        VALUES ($1, $2, $3)
        RETURNING id
        `,
        [
          item.command,
          item.description,
          JSON.stringify(item.sub_commands),
        ]
      );

      const commandId = commandResult.rows[0].id;

      for (const doc of item.docs) {
        await client.query(
          `
          INSERT INTO help_docs (command_id, title, content)
          VALUES ($1, $2, $3)
          `,
          [commandId, doc.title, doc.content]
        );
      }
    }

    await client.query("COMMIT");
    console.log("Seed help_commands & help_docs selesai");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Seed help gagal:", err);
  } finally {
    client.release();
  }
};

const getAllCommands = async () => {
  const { rows } = await pool.query(
    `SELECT id, command, description FROM help_commands ORDER BY id ASC`
  );

  return rows;
};

const getHelpCommandById = async ({ commandId }) => {
  const query = {
    text: `SELECT * FROM help_commands WHERE id = $1`,
    values: [commandId]
};
  return await pool.query(query);
};

const getDocsByCommandId = async ({ commandId }) => {
  const query = {
    text: `SELECT id, title, content FROM help_docs WHERE command_id = $1 ORDER BY id ASC`,
    values: [commandId]
};

  return await pool.query(query);
};

export {
  createHelp,
  getAllCommands,
  getDocsByCommandId,
  getHelpCommandById,
};