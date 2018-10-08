var app = require("http").createServer(handler);
var io = require("socket.io")(app);
var fs = require("fs");
var serveStatic = require("serve-static");
var finalhandler = require("finalhandler");

const APP_PORT = Math.round(Math.random() * 1999 + 8000);

var serve = serveStatic("build", { index: ["index.html"] });

app.listen(APP_PORT, () => {
  console.log(`App listening at port ${APP_PORT};
http://localhost:${APP_PORT}`);
});

function handler(req, res) {
  serve(req, res, finalhandler(req, res));
}

io.on("connection", function(socket) {
  socket.emit("news", { hello: "world" });
  socket.on("my other event", function(data) {
    console.log(data);
  });
});
