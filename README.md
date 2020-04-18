# Discord Custom Status

A Discord bot widget to set the status of the bot.

## Setup

1. Follow the instructions in [create-discord-bot](https://github.com/peterthehan/create-discord-bot).

2. Download this widget and move it into the [src/widgets](https://github.com/peterthehan/create-discord-bot/blob/master/src/widgets/) folder.

3. Open [config.js](https://github.com/EximiaStudios/discord-custom-status/blob/master/config.js) to configure your own settings:

```js
module.exports = {
    status: "EximiaStudios debut game!",
    activityType: "PLAYING"

    // Available types are:
    //     PLAYING
    //     STREAMING
    //     LISTENING
    //     WATCHING
    //     CUSTOM_STATUS
    //
    // Currently CUSTOM_STATUS does not work with a Bot

};
```
