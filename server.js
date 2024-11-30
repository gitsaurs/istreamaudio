const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

let adminSocket = null;

server.on("connection", (socket, req) => {
    if (req.url === "/admin") {
        adminSocket = socket;
        console.log("Admin connected");
    } else {
        console.log("User connected");
        socket.on("message", (message) => {
            if (adminSocket && adminSocket.readyState === WebSocket.OPEN) {
                adminSocket.send(message);
            }
        });
    }

    socket.on("close", () => {
        console.log("Connection closed");
    });
});

console.log("WebSocket server running on ws://localhost:8080");
