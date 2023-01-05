const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const math = require('mathjs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('calculator')
        .setDescription(`F.R.I.D.A.Y's Built-In Calculator`),

    setTimeout: 20000,

    async execute (interaction, client) {
        const rows = [
            new MessageActionRow().addComponents([
                new MessageButton({
                    customId: 'clear',
                    style: 'DANGER',
                    label: "AC",
                }),
                new MessageButton({
                    customId: '(',
                    style: 'PRIMARY',
                    label: "(",
                }),
                new MessageButton({
                    customId: ')',
                    style: 'PRIMARY',
                    label: ")",
                }),
                new MessageButton({
                    customId: '/',
                    style: 'PRIMARY',
                    label: "➗",
                })
            ]),
            new MessageActionRow().addComponents([
                new MessageButton({
                    customId: '7',
                    style: 'SECONDARY',
                    label: "7",
                }),
                new MessageButton({
                    customId: '8',
                    style: 'SECONDARY',
                    label: "8",
                }),
                new MessageButton({
                    customId: '9',
                    style: 'SECONDARY',
                    label: "9",
                }),
                new MessageButton({
                    customId: '*',
                    style: 'PRIMARY',
                    label: "✖",
                })
            ]),
            new MessageActionRow().addComponents([
                new MessageButton({
                    customId: '4',
                    style: 'SECONDARY',
                    label: "4",
                }),
                new MessageButton({
                    customId: '5',
                    style: 'SECONDARY',
                    label: "5",
                }),
                new MessageButton({
                    customId: '6',
                    style: 'SECONDARY',
                    label: "6",
                }),
                new MessageButton({
                    customId: '-',
                    style: 'PRIMARY',
                    label: "➖",
                })
            ]),
            new MessageActionRow().addComponents([
                new MessageButton({
                    customId: '1',
                    style: 'SECONDARY',
                    label: "1",
                }),
                new MessageButton({
                    customId: '2',
                    style: 'SECONDARY',
                    label: "2",
                }),
                new MessageButton({
                    customId: '3',
                    style: 'SECONDARY',
                    label: "3",
                }),
                new MessageButton({
                    customId: '+',
                    style: 'PRIMARY',
                    label: "➕",
                })
            ]),
            new MessageActionRow().addComponents([
                new MessageButton({
                    customId: 'backspace',
                    style: 'PRIMARY',
                    label: "⬅️",
                }),
                new MessageButton({
                    customId: '0',
                    style: 'SECONDARY',
                    label: "0",
                }),
                new MessageButton({
                    customId: '.',
                    style: 'PRIMARY',
                    label: "⚫",
                }),
                new MessageButton({
                    customId: 'result',
                    style: 'SUCCESS',
                    label: "=",
                })
            ]),
        ];

        const msg = await interaction.reply({
            components: rows,
            embeds: [{
                description: "```\nResults will be displayed here\n```",
                color: "BLUE"
            }],
            fetchReply: true,
        });

        let data = "";

        const col = msg.createMessageComponentCollector({
            filter: i => i.user.id === interaction.user.id,
            time: 300000
        });

        col.on('collect', async (i) => {
            let extra = "";

            if (i.customId === "result") {
                try {
                    data = math.evaluate(data).toString();
                } catch (e) {
                    data = "";
                    extra = "An Error Occured, Please click on AC for restart";
                }
            } else if (i.customId === "clear") {
                data = "";
                extra = "Results will be displayed here"
            } else if (i.customId === "backspace") {
                data = data.slice(0, data.length - 2);
            } else {
                const lc = data[data.length - 1];

                data += `${(
                    (parseInt(i.customId) == i.customId || i.customId === ".")
                    &&
                    (lc == parseInt(lc) || lc === ".")
                ) || data.length === 0 ? "" : " "}` + i.customId;
            }

            i.update({
                embeds: [{
                    color: "BLUE",
                    description: `\`\`\`\n${data || extra}\n\`\`\``
                }]
            })
        })

        col.on('end', () => {
            msg.edit({
                components: [new MessageActionRow().addComponents([
                    new MessageButton({
                        label: "The Calculator Has Ended!",
                        disabled: true,
                        style: "DANGER",
                        customId: "_1_"
                    })
                ])]
            })
        })
    }
}