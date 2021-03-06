const { readdirSync } = require("fs");

const commands = {};
const cmdFiles = readdirSync(__dirname);
cmdFiles.forEach(cmdFile => {
  if (cmdFile === "index.js") return;
  try {
    console.log(`Loading command: ${cmdFile}`);
    const command = require(`./${cmdFile}`);
    commands[command.aliases[0]] = command;
  } catch (e) {
    console.log(`Error loading command ${cmdFile}: ${e}`);
  }
});

module.exports = commands;
