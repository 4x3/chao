const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "help",
  aliases : ['h'],
  description: "shows all available bot commands",
  run: async (client, message, args) => {


    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "no command name";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toLowerCase(),
          value: cmds.length === 0 ? "in progress" : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setTitle("need help? here are all of my commands:")
        .addFields(categories)
        .setDescription(
          `use \`${prefix}help\` followed by a command name to get more additional information on a command. for example: \`${prefix}help ban\`.`
        )
        .setFooter(
          `requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setColor(roleColor);
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`invalid command! use \`${prefix}help\` for all of my commands!`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("command details:")
        .addField("prefix:", `\`${prefix}\``)
        .addField(
          "command:",
          command.name ? `\`${command.name}\`` : "no name for this command"
        )
        .addField(
          "aliases:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "no aliases for this command"
        )
        .addField(
          "usage:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "description:",
          command.description
            ? command.description
            : "no description for this command"
        )
        .setFooter(
          `requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setColor(roleColor);
      return message.channel.send(embed);
    }
  },
};
