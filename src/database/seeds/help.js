import {createHelp} from "../repository/help.js";

const helpSeedData = [
  {
    command: "help",
    description: "Menampilkan daftar command",
    sub_commands: [
      {
        name: "help ping",
        description: "Cek latency bot",
      },
      {
        name: "help invite",
        description: "Informasi invite bot",
      },
    ],
    docs: [
      {
        title: "Command Help",
        content: "Gunakan /help untuk melihat semua command yang tersedia.",
      },
    ],
  },

  {
    command: "welcome",
    description: "Mengatur fitur welcome message di server",
    sub_commands: [
      {
        name: "welcome turn on [channel]",
        description: "Mengaktifkan welcome message dan menentukan channel tujuan",
      },
      {
        name: "welcome turn off",
        description: "Menonaktifkan fitur welcome message",
      },
      {
        name: "welcome status",
        description: "Melihat status fitur welcome message",
      },
    ],
    docs: [
      {
        title: "Welcome Feature",
        content:
          "Fitur welcome digunakan untuk mengirim pesan otomatis ketika member baru bergabung ke server.",
      },
      {
        title: "Mengaktifkan Welcome",
        content:
          "Gunakan `/welcome turn on [channel]` untuk mengaktifkan fitur welcome dan menentukan channel tempat pesan dikirim.",
      },
      {
        title: "Menonaktifkan Welcome",
        content:
          "Gunakan `/welcome turn off` untuk menonaktifkan fitur welcome di guild.",
      },
      {
        title: "Cek Status Welcome",
        content:
          "Gunakan `/welcome status` untuk mengecek apakah fitur welcome sedang aktif atau tidak.",
      },
    ],
  },
  {
    command: "invite-tracker",
    description: "Mengatur fitur invite tracker di server",
    sub_commands: [
      {
        name: "invite-tracker turn on [channel]",
        description: "Mengaktifkan invite tracker dan menentukan channel log",
      },
      {
        name: "invite-tracker turn off",
        description: "Menonaktifkan fitur invite tracker",
      },
      {
        name: "invite-tracker status",
        description: "Melihat status fitur invite tracker",
      },
    ],
    docs: [
      {
        title: "Invite Tracker Feature",
        content:
          "Fitur invite tracker digunakan untuk melacak undangan member yang bergabung ke server.",
      },
      {
        title: "Mengaktifkan Invite Tracker",
        content:
          "Gunakan `/invite-tracker turn on [channel]` untuk mengaktifkan invite tracker dan menentukan channel tempat log dikirim.",
      },
      {
        title: "Menonaktifkan Invite Tracker",
        content:
          "Gunakan `/invite-tracker turn off` untuk menonaktifkan fitur invite tracker di guild.",
      },
      {
        title: "Cek Status Invite Tracker",
        content:
          "Gunakan `/invite-tracker status` untuk mengecek apakah fitur invite tracker sedang aktif atau tidak.",
      },
    ],
  },
  {
    command: "stats-server",
    description: "Mengelola statistik role server dalam bentuk category dan channel",
    sub_commands: [
      {
        name: "stats-server create",
        description: "Membuat category dan channel statistik berdasarkan role",
      },
      {
        name: "stats-server delete",
        description: "Menghapus category statistik server",
      },
    ],
    docs: [
      {
        title: "Stats Server Feature",
        content:
          "Fitur stats server digunakan untuk menampilkan statistik jumlah member berdasarkan role dalam server.",
      },
      {
        title: "Membuat Stats Server",
        content:
          "Gunakan `/stats-server create` untuk membuat statistik server. Admin akan diminta memilih beberapa role, lalu mengisi nama category. Bot akan membuat category baru dan channel private berisi status jumlah member setiap role.",
      },
      {
        title: "Menghapus Stats Server",
        content:
          "Gunakan `/stats-server delete` untuk menghapus category statistik. Admin akan ditampilkan embed select untuk memilih category berdasarkan id yang ingin dihapus.",
      },
    ],
  },
  {
    command: "take-role",
    description: "Membuat embed interaktif untuk pengambilan role",
    sub_commands: [
      {
        name: "take-role create [channel]",
        description: "Membuat embed take role dan mengirimkannya ke channel tujuan",
      },
      {
        name: "take-role delete",
        description: "Menghapus embed take role yang telah dibuat",
      },
    ],
    docs: [
      {
        title: "Take Role Feature",
        content:
          "Fitur take role digunakan untuk memberikan role kepada member melalui embed interaktif seperti button atau select menu.",
      },
      {
        title: "Membuat Take Role",
        content:
          "Gunakan `/take-role create [channel]` untuk membuat embed take role. Admin akan diminta memilih beberapa role, mengatur style embed seperti button atau select menu, serta menentukan desain embed. Setelah selesai, embed akan dikirim ke channel tujuan dan masuk status listening.",
      },
      {
        title: "Menghapus Take Role",
        content:
          "Gunakan `/take-role delete` untuk menghapus embed take role. Admin akan ditampilkan embed select untuk memilih embed berdasarkan id atau category yang ingin dihapus.",
      },
    ],
  }

];


export default async () => {
  await createHelp({helpSeedData});
};
