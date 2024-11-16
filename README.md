# Community Mods for [Bot Maker for Discord](https://store.steampowered.com/app/2592170/Bot_Maker_For_Discord/)

This repository houses community-made mods for Bot Maker for Discord (BMD).

## Navigation

- [Installation](#installation)
  - [Using the CLI Tool](#using-the-cli-tool)
  - [Manual Installation](#manual-installation)
  - [Using `Install-mods.bat`](#using-install-modsbat-not-recommended)
- [Creating Mods](#creating-mods)
- [Uploading Mods via GitHub Pull Requests](#uploading-mods-via-github-pull-requests)
  - [Using the Web Interface](#using-the-web-interface)
  - [Using the Local Machine](#using-the-local-machine)
- [Contact](#contact)
- [License](#license)

## Installation
### Getting mods from the Workshop
[Click me to launch BMD's Install Interface](bmd://workshop/query:mods)

### Using the CLI Tool

[_Work in Progress (W.I.P.)_](https://github.com/qizzle/bmdm)
BMD built-in mod manager coming soon™️

### Manual Installation

1. Download the repository by clicking "Code" on the repository's home page and selecting "Download ZIP".
2. Extract the ZIP archive.
3. Move the "Actions" folder to your Bot Maker for Discord's AppData directory, typically located at:
   ```
   C:\Program Files (x86)\Steam\steamapps\common\Bot Maker For Discord\AppData
   ```
4. Move the "Themes" folder to the main directory of your Bot Maker for Discord installation, typically located at:
   ```
   C:\Program Files (x86)\Steam\steamapps\common\Bot Maker For Discord
   ```
5. Restart the Bot Maker for Discord application.
6. You're all set!

## Creating Mods

> [!IMPORTANT]
> Refer to the [short documentation](https://github.com/RatWasHere/bmods/blob/master/MODS.md) for guidance on creating your own mods.

Please follow the general structure when creating mods. Therefore, add **\_MOD** after your mod name, don't include any additional dots or spaces, and make sure to include the info object within your modded action.
Feel free to add a short description for your action as seen in [**animeSearch_MOD.js**](https://github.com/RatWasHere/bmods/blob/master/Actions/animeSearch_MOD.js).

You may find a list of the apps actions, events, icons, and kits [here](https://github.com/devvyyxyz/BMD-Actions).

Try to use as few packages as possible, especially for simple functionality. Use packages only when absolutely necessary.

AI-generated code is not allowed. While using AI as a tool for assistance is permitted, all code must be created and reviewed by human contributors.

## Uploading Mods via GitHub Pull Requests

To contribute your mods to this repository, you can use either the GitHub web interface or your local machine.\
For a detailed tutorial, [**view this**](https://github.com/RatWasHere/bmods/blob/master/UPLOAD.md).

## Contact

Join our community on the [Discord server](https://discord.gg/whtjS7BW3u) for support and discussion.

## License

This project is distributed under the [MIT License](https://github.com/RatWasHere/bmods/blob/master/LICENSE).
