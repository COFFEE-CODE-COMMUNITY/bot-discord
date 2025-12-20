import {getWelcome} from "../../database/repository/welcome.js";
import {AttachmentBuilder, EmbedBuilder, TextChannel} from "discord.js";
import {createCanvas, loadImage} from "canvas";
import {fileURLToPath} from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backgroundPath = path.resolve(
  __dirname,
  "../../../public/welcome-banner.png"
);

const welcome = async ({ member }) => {
  const guild = member.guild;

  const data = await getWelcome();
  if (!data) return;

  const channel = guild.channels.cache.get(data.channel_id);
  if (!channel || !(channel instanceof TextChannel)) return;

  const { embed, attachment } = await welcomeEmbed({member});

  await channel.send({
    embeds: [embed],
    files: [attachment],
  });
};

const welcomeEmbed = async ({member}) => {
  const user = member.user;
  const guild = member.guild;

  const size = [1920, 1080];
  const canvas = createCanvas(size[0], size[1]);
  const ctx = canvas.getContext('2d');
  const background = await loadImage(backgroundPath);
  ctx.drawImage(background, 0, 0, size[0], size[1]);

  const avatar = await loadImage(
    user.displayAvatarURL({
      extension: "png",
      size: 256
    })
  );

  const avatarSize = 180;

  const avatarX = (size[0] - avatarSize) / 2;
  const avatarY = (size[1] - avatarSize) / 2 - 150;


  ctx.save();
  ctx.beginPath();
  ctx.arc(
    avatarX + avatarSize / 2,
    avatarY + avatarSize / 2,
    avatarSize / 2,
    0,
    Math.PI * 2
  );
  ctx.closePath();
  ctx.clip();

  ctx.drawImage(
    avatar,
    avatarX,
    avatarY,
    avatarSize,
    avatarSize
  );
  ctx.restore();

  ctx.fillStyle = '#236EA8';
  ctx.textAlign = 'center';

  ctx.font = 'bold 78px Sans';
  ctx.fillText(
    `WELCOME, ${member.user.username.toUpperCase()}`,
    size[0] / 2,
    avatarY + avatarSize + 110
  );

  ctx.font = 'bold 34px Sans';
  ctx.fillText(
    `Brew Ideas, Code Hard, Chill Together`,
    size[0] / 2,
    avatarY + avatarSize + 165
  );


  const attachment = new AttachmentBuilder(canvas.toBuffer("image/png"), {
    name: "welcome.png",
  });

  const embed = new EmbedBuilder()
    .setTitle("Coffee Code Community")
    .setDescription(`Welcome ${member}\n\n` +
      `*Hai, Hai! Selamat Datang di C3*\n\n` +
      `Halo untuk kamu yang baru bergabung! Kami senang bisa menyambutmu di sini.\n\n` +
      `Di komunitas ini, kamu akan menemukan berbagai informasi menarik seputar C3 yang bisa membantu kamu lebih memahami komunitas ini.\n\n` +
      `• Mau tahu lebih banyak soal C3? Cek di <#INFO_CHANNEL_ID>\n` +
      `• Punya ide keren atau masukan? Langsung tulis di <#CONFESSION_CHANNEL_ID>`)
    .setColor(1752220)
    .setImage("attachment://welcome.png")
    .setFooter({
      text: 'Copyright © 2024 Coffee Code Community',
    });

  return {
    embed,
    attachment,
  };
};

export {
  welcome,
};