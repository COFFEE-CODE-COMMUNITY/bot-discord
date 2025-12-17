import { pool } from "../index.js";

const upsertFeedbackConfig = async ({
  guildId,
  panelChannelId,
  suggestionChannelId,
  reportChannelId,
  bugChannelId,
}) => {
  const query = {
    text: `INSERT INTO feedback_config (guild_id, panel, suggestion, report, bug)
         VALUES ($1, $2, $3, $4, $5) ON CONFLICT (guild_id) DO UPDATE SET 
         panel = EXCLUDED.panel, suggestion = EXCLUDED.suggestion, report = EXCLUDED.report, bug = EXCLUDED.bug`,
    values: [guildId, panelChannelId, suggestionChannelId, reportChannelId, bugChannelId]
  };

  await pool.query(query);
};

const getFeedbackConfig = async (guildId) => {

    const query = {
        text: `SELECT * FROM feedback_config WHERE guild_id = $1`,
        values: [guildId]
    };
    const { rows } = await pool.query(query);

    return rows[0] ?? null;
};

export {
    upsertFeedbackConfig,
    getFeedbackConfig
};