const { SlashCommandBuilder } = require('@discordjs/builders');
const { Configuration, OpenAIApi } = require('openai');
const { MessageEmbed } = require('discord.js');

const configuration = new Configuration({
    apiKey: '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'
});

const openai = new OpenAIApi(configuration);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chat')
        .setDescription('Ask F.R.I.D.A.Y a question.')
        .addStringOption(option => option.setName('question')
            .setDescription('The question that F.R.I.D.A.Y will pass to her friend ChatGPT.')
            .setRequired(true)),

    async execute(Interaction, client) {

        await Interaction.deferReply();

        const question = Interaction.options.getString('question');

        try {
            const res = await openai.createCompletion({
                model: 'text-davinci-003',
                max_tokens: 2048,
                temperature: 0.5,
                prompt: question
            });

            const embed = new MessageEmbed()
                .setColor('#ff634a')
                .setDescription(`\`\`\`${res.data.choices[0].text}\`\`\``)
                .setFooter({ text: `${client.user.username} `, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
                .setTimestamp()

            await Interaction.editReply({ embeds: [embed] });
        } catch (e) {
            return await Interaction.editReply({ content: `Your request failed with status code: **${e.response.status}**`, ephemeral: true })
        }
    }
}