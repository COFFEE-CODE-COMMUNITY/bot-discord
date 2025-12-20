import {getAll} from "../../database/repository/welcome.js";
import {AttachmentBuilder, EmbedBuilder, TextChannel} from "discord.js";
import {createCanvas, loadImage} from "canvas";

const welcome = async ({ member }) => {
  const guild = member.guild;

  const data = await getAll();
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

  const size = [1200, 400];
  const canvas = createCanvas(size[0], size[1]);
  const ctx = canvas.getContext('2d');
  const background = await loadImage("./public/welcome-banner.png");
  ctx.drawImage(background, 0, 0, size[0], size[1]);

  const avatar = await loadImage(
    user.displayAvatarURL({
      extension: "png",
      size: 256
    })
  );

  const avatarSize = {size: 180, x: 60, y: (size[0] - 180) / 2};

  ctx.save();
  ctx.beginPath();
  ctx.arc(
    avatarSize.x + avatarSize.size / 2,
    avatarSize.y + avatarSize.size / 2,
    avatarSize.size / 2,
    0,
    Math.PI * 2,
  );
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(avatar, avatarSize.x, avatarSize.y, avatarSize.size, avatarSize.size);
  ctx.restore();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 48px Sans';
  ctx.fillText(
    `WELCOME, ${member.user.username.toUpperCase()}`,
    280,
    190
  );

  ctx.font = '28px Sans';
  ctx.fillText(
    `Selamat datang di ${guild.name}`,
    280,
    240
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