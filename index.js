const { Client, GatewayIntentBits, EmbedBuilder, ActivityType } = require('discord.js');
const axios = require('axios');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
    console.log(`✅ Bot đã khởi động thành công: ${client.user.tag}`);
    client.user.setActivity('Roblox Updates', { type: ActivityType.Watching });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'version') {
        await interaction.deferReply();
        try {
            const res = await axios.get('https://setup.rbxcdn.com/version');
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('🌐 Roblox Client Version')
                .setDescription(`Phiên bản mới nhất: \`${res.data.trim()}\``)
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });
        } catch (e) {
            await interaction.editReply('❌ Lỗi kết nối đến Roblox!');
        }
    }
});

client.login(process.env.DISCORD_TOKEN);