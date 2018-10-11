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
var chokidar = require("chokidar");
var unzip = require("unzip");

var argv = require("minimist")(process.argv.slice(2));
global.fileRoot = argv.fileRoot;
global.userRoot = require("os").homedir();
global.templatesPath = path.resolve(userRoot, ".templates");
global.exportPath = path.resolve(userRoot, ".templates_export");
shell.mkdir("-p", exportPath);
global.importPath = path.resolve(userRoot, ".templates_import");
shell.mkdir("-p", importPath);

var watcher = chokidar.watch(importPath, {});
watcher.on("add", archive => {
  console.log("File added");
  if (path.extname(archive) === ".zip") {
    console.log("Archive added");
    fs.createReadStream(archive)
      .pipe(unzip.Extract({ path: templatesPath }))
      .on("finish", function() {
        console.log("Import done");
        fs.unlink(archive, () => {
          return;
        });
        setTimeout(() => {
          global.methods.get_templates_list(null, result => {
            for (let key in global.connections) {
              global.connections[key].emit("get_templates_list_result", result);
            }
          });
        }, 100);
      });
  } else {
    console.log("It is not zip archive");
    fs.unlink(archive, () => {
      return;
    });
  }
});

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

global.methods = require("./methods");

global.connections = [];
io.on("connection", function(socket) {
  global.connections.push(socket);
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
