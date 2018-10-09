const spawn = require("child_process").spawn;
const path = require("path");
let server = null;

console.log(__dirname, path.resolve("./"));

function start() {
  server = spawn("node", [
    path.resolve(__dirname, "server/index"),
    `--fileRoot=${__dirname}`
  ]);

  server.stdout.on("data", data => {
    console.log(`${data}`);
  });

  server.stderr.on("data", data => {
    console.log(`${data}`);
  });

  server.on("close", code => {
    console.log(`child process exited with code ${code}`);
    setTimeout(() => {
      start();
    });
  });
}

start();
