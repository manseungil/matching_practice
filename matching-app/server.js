const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

let users = [];
let waitingQueue = [];

io.on("connection", (socket) => {
    console.log("a user connected:", socket.id);

    socket.on("login", (userName, callback) => {
        const user = { id: socket.id, name: userName };
        users.push(user);
        callback({ ok: true, data: user });
    });

    socket.on("requestMatch", (user, callback) => {
        if (waitingQueue.length > 0) {
            const matchedUser = waitingQueue.shift();
            io.to(user.id).emit("match", matchedUser);
            io.to(matchedUser.id).emit("match", user);
        } else {
            waitingQueue.push(user);
        }
        callback({ ok: true });
    });

    socket.on("sendMessage", (message, callback) => {
        io.emit("message", { user: socket.id, text: message });
        callback({ ok: true });
    });

    socket.on("disconnect", () => {
        console.log("user disconnected:", socket.id);
        users = users.filter(u => u.id !== socket.id);
        waitingQueue = waitingQueue.filter(u => u.id !== socket.id);
    });
});

const PORT = 5001;
server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});
