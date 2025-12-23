import {handleStatsServerDelete, handleStatsServerSelect} from "./statsServer.js";
import {handleTakeRoleDeleteSelect, handleTakeRoleSelect} from "./takeRole.js";
import {handleTakeRoleSelectMenu} from "../../../services/takeRole.js";

const handleStringSelect = async (interaction) => {
  const [domain] = interaction.customId.split(':');

  switch(domain) {
    case 'stats-server-select':
      return handleStatsServerSelect(interaction);
    case 'stats-server-delete':
      return handleStatsServerDelete(interaction);
    case 'take-role-select':
      return handleTakeRoleSelect(interaction);
    case "take-role":
      return handleTakeRoleSelectMenu(interaction);
    case "take-role-delete":
      return handleTakeRoleDeleteSelect(interaction);
    default:
      await interaction.reply({
        content: 'String Select tidak dikenali',
        ephemeral: true
      });
  }
};

export {
  handleStringSelect
};