const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
// const { Socket } = require("dgram");
/**
 * @param  {} "socket.io"
 * @param  {} (server
 * @param  {{origin:"*"} {cors
 * @param  {["GET"} methods
 * @param  {} "POST"]
 * @param  {} }
 * @param  {} }
 */
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is running.");
});
/**
 * @param  {} "connection"
 * @param  {} (socket
 * @param  {} =>{socket.emit("me"
 * @param  {} socket.id
 * @param  {} ;socket.on("disconnect"
 * @param  {} (
 * @param  {} =>{socket.broadcast.emit("callend"
 * @param  {} ;}
 * @param  {} ;socket.on("calluser"
 * @param  {} ({userToCall
 * @param  {} signalData
 * @param  {} from
 * @param  {} name}
 * @param  {} =>{io.to(userToCall
 * @param  {} .emit("calluser"
 * @param  {signalData} {signal
 * @param  {} from
 * @param  {} name}
 * @param  {} ;}
 * @param  {} ;socket.on("answercall"
 * @param  {} (data
 * @param  {} =>{io.to(data.to
 * @param  {} .emit("callaccepted"
 * @param  {} data.signal
 * @param  {} ;}
 * @param  {} ;}
 */
io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callend");
  });

  socket.on("calluser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("calluser", { signal: signalData, from, name });
  });

  socket.on("answercall", (data) => {
    io.to(data.to).emit("callaccepted", data.signal);
  });
});

server.listen(PORT, () => console.log(`Server is listening on post ${PORT}`));
