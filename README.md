# F.R.I.D.A.Y_SLASH
 Premiere Auto-Moderation & Administrative Discord Bot - Version 2.0 (Supports Slash Commands) 

This bot uses an older version of the Discord.js library (Version 13.10.2). Full documentation for that version can be found [here](https://old.discordjs.dev/#/docs/discord.js/13.10.3/general/welcome). This version is not depracated yet, and may still be used. 

* The Client (Bot)'s token is required from the project's [Source File](src/index.js).
* The Client (Bot)'s database token containing a custom MongoDB URL string is required from the Bot's 'Ready' event found in [ready.js](src/events/ready.js).

* These tokens are stored privately in an `.env` file, which is not in this repository due to security concerns. If you would like to use the same method when starting your bot or connecting to a database, please create a `.env.` file and include it in your project with your bot's token that can be gained from the [Discord Developer Portal](https://discord.com/developers/docs/getting-started).
