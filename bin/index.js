#!/usr/bin/env node
const cmd = require("child_process");

let dirName = process.argv[2]

try {
  if (!dirName || !dirName.match(/^[a-z0-9_-]+$/i)) {
    console.log("You need to use the command like this:")
    console.log("$ npx iron-mern-generator the-name-of-the-folder")
  }
  else {
    let dirName = process.argv[2]

    // Cloning information from Git
    console.log("----- Fetching information from GitHub... -----")
    cmd.execSync(`git clone  --depth=1 https://github.com/mc100s/mern-hooks-boilerplate ${dirName}`)
    cmd.execSync(`rm -rf ${dirName}/.git`)
    cmd.execSync(`cd ${dirName} && git init && git add . && git commit -m "First commit with the MERN boilerplate (https://github.com/mc100s/mern-hooks-boilerplate)"`)

    let randomSessionSecret = ""
    for (let i = 0; i < 30; i++) randomSessionSecret += String.fromCharCode(97 + Math.floor(Math.random()*26))
    cmd.execSync(`touch ${dirName}/server/.env && echo "PORT=5000
SESSION_SECRET=${randomSessionSecret}
MONGODB_URI=mongodb://localhost/${dirName}
" > ${dirName}/server/.env`)

    console.log("\n----- Installing packages for the server... -----")
    console.log(cmd.execSync(`cd ${dirName}/server && npm install`).toString())

    console.log("\n----- Installing packages for the client... -----")
    console.log(cmd.execSync(`cd ${dirName}/client && npm install`).toString())

    console.log("\n----- Your application is ready 🚀 -----")
    console.log(`To open the project with VS Code, type:`)
    console.log(`$ code ${dirName}`)
    console.log(`\nThen you need to open 2 different terminals and run:`)
    console.log(`$ npm run dev:server`)
    console.log(`$ npm run dev:client`)
  }

}
catch (err) {
  console.log("An error happened")
  console.log(err)
}