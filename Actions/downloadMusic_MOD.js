// requires the yt-dlp binary for whichever platform is it that you use.

const { readFileSync } = require("fs")

module.exports ={
  data: {
    name: "Download Music File",
    //ytdlp: "https://github.com/yt-dlp/yt-dlp?tab=readme-ov-file#release-files"
  },
  aliases: ["Download YouTube Audio", "Download Audio"],
  modules: ["fs", "node:child_process"],
  info: {
    source: "https://github.com/slothyace/bmods-acedia/tree/main/Actions",
    creator: "Acedia",
    donate: "https://ko-fi.com/slothyacedia",
  },
  category: "Utilities",
  UI: [
    {
      element: "input",
      storeAs: "sourceLink",
      name: "Audio Source Link",
    },
    {
      element: "dropdown",
      storeAs: "format",
      name: "Audio Format",
      choices: [
        {name: "mp3"},
        {name: "flac"}
      ]
    },
    {
      element: "input",
      storeAs: "outputFolder",
      name: "Storage Path",
    },
    {
      element: "text",
      text: `<div style="text-align=left">Seprate Path With ":", To Store It In A Folder Named "Music", Just Put Path As "Music"</div>`
    },
    "-",
    {
      element: "store",
      storeAs: "finalName",
      name: "Store Final File Name As",
    },
    {
      element: "store",
      storeAs: "finalSource",
      name: "Store Final Path As"
    },
    {
      element: "store",
      storeAs: "finalFile",
      name: "Store Final File As"
    },
    "-",
    {
      element: "text",
      text: `<div style="text-align=left">
      Requires the yt-dlp binary to be present in the same folder as bot.js file!<br>
      May require python 3.09+ to be installed!
      <button style="width: fit-content;" onclick="require('electron').shell.openExternal('https://github.com/yt-dlp/yt-dlp?tab=readme-ov-file#release-files')"><btext>Download yt-dlp</btext></button>
      <button style="width: fit-content;" onclick="require('electron').shell.openExternal('https://www.python.org/downloads/')"><btext>Download python</btext></button> 
      </div>`
    },
    {
      element: "toggle",
      storeAs: "logging",
      name: "Log Debug Statements"
    }
  ],

  subtitle: (values) => {
    return `Download ${values.sourceLink} In ${values.format}, Saved To ${values.outputFolder}.`
  },

  compatibility: ["Any"],

  async run(values, message, client, bridge){
    // yt-dlp -x --audio-format <format> --windows-filenames -o %(NAME)s -p <outputPath> <url>
    let format = bridge.transf(values.format)
    let folderPath = bridge.transf(values.outputFolder)
    let url = bridge.transf(values.sourceLink)

    await new Promise((res, rej)=>{
      let command = `yt-dlp -x --audio-format <format> --windows-filenames -o %(title)s -P <outputPath> <url>`
      command = command.replace("<format>", format)
      command = command.replace("<outputPath>", folderPath)
      fcommand = command.replace("<url>", url)

      require("child_process").exec(fcommand, (error, stdout) =>{
        if (values.logging==true){
          console.log(stdout)
          console.log(error)
        }
        if (stdout.includes("[ExtractAudio]")){
          let match = stdout.match(/Destination:\s+(.+)/)
          if (match){
            let filePath = match[1].trim()
            let fileName = filePath.match(/[\\/][^\\/]+$/)?.[0]?.substring(1) || "UnknownFileName"
            let fileSource = filePath.replace("\\", "\\\\")+"."+format
            let file = bridge.fs.readFileSync(fileSource)
            if (values.logging==true){
              console.log(fileName)
              console.log(fileSource)
            }
            bridge.store(values.finalSource, fileSource)
            bridge.store(values.finalFile, file)
            bridge.store(values.finalName, fileName)
            return res()
          }
        }
        else if(stdout.includes("has already been downloaded")){
          bridge.store(values.finalSource, "File Already Exists")
          bridge.store(values.file, "File Already Exists")
          bridge.store(values.finalName, "File Already Exists")
        }
        else if (error){
          bridge.store(values.finalSource, error.message)
          bridge.store(values.finalFile, error.message)
          bridge.store(values.finalName, error.message)
          return res()
        }
      })
    })
  }
}