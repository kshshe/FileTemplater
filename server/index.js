var app = require("http").createServer(handler);
var io = require("socket.io")(app);
var fs = require("fs");
var serveStatic = require("serve-static");
var finalhandler = require("finalhandler");
const path = require("path");
var serve = serveStatic(path.resolve(__dirname, "../app/build"), {
  index: ["index.html"]
});
var opn = require("opn");
var shell = require("shelljs");

var argv = require("minimist")(process.argv.slice(2));
global.fileRoot = argv.fileRoot;
global.userRoot = require("os").homedir();

fs.exists(path.resolve(userRoot, ".templates"), function(exists) {
  if (!exists) {
    shell.cp(
      "-R",
      path.resolve(fileRoot, "templates"),
      path.resolve(userRoot, ".templates")
    );
  }
});

const APP_PORT = Math.round(Math.random() * 1999 + 8000);

app.listen(APP_PORT, () => {
  const url = `http://localhost:${APP_PORT}`;
  console.log(url);
  console.log(
    `Your templates are here: ${path.resolve(userRoot, ".templates")}`
  );
  opn(url);
});

function handler(req, res) {
  serve(req, res, finalhandler(req, res));
}

const methods = require("./methods");

io.on("connection", function(socket) {
  var onevent = socket.onevent;
  socket.onevent = function(packet) {
    var args = packet.data || [];
    onevent.call(this, packet);
    packet.data = ["*"].concat(args);
    onevent.call(this, packet);
  };

  socket.on("*", function(event, data) {
    if (methods[event]) {
      methods[event](
        ...(typeof data === "object" ? Object.values(data) : [data]),
        result => {
          socket.emit(event + "_result", result);
        }
      );
    }
  });
});
