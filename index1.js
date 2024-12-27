var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000;
server.listen(port, () => console.log("Server running in port " + port));

io.on("connection", function (socket) {
  //Bắt sự kiện một client kết nối đến server

  socket.on("all client", function (data) {
    //lắng nghe event 'all client'
    io.sockets.emit("news", socket.id + " send all client: " + data); // gửi cho tất cả client
  });

  socket.on("broadcast", function (data) {
    //lắng nghe event 'broadcast'
    socket.broadcast.emit("news", socket.id + " send broadcast: " + data); // gửi event cho tất cả các client từ client hiện tại
  });

  socket.on("private", function (data) {
    //lắng nghe event 'private'
    socket.emit("news", " You send private message: " + data); // chỉ gửi event cho client hiện tại
  });
});

app.get("/", (req, res) => {
  res.sendFile("test-socket-client.html", { root: __dirname });
});
