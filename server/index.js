var app = require("http").createServer(handler);
var io = require("socket.io")(app);
var fs = require("fs");
var serveStatic = require("serve-static");
var finalhandler = require("finalhandler");
const path = require("path");
var serve = serveStatic(path.resolve(__dirname, "build"), {
  index: ["index.html"]
});

const APP_PORT = 9967; // Math.round(Math.random() * 1999 + 8000);

app.listen(APP_PORT, () => {
  console.log(`http://localhost:${APP_PORT}`);
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
      methods[event](data, result => {
        socket.emit(event + "_result", result);
      });
    }
  });
});
