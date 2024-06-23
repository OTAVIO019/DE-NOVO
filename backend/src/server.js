const { WebSocketServer } = require("ws");
const dotenv = require("dotenv");

dotenv.config();

const wss = new WebSocketServer({ port: process.env.PORT || 8080 });

wss.on("connection", (ws) => {
    ws.on("error", console.error);

    // Enviar uma mensagem de boas-vindas ao cliente recém-conectado
    ws.send(JSON.stringify({ userId: "server", userName: "Server", userColor: "blue", content: "Bem-vindo ao chat!" }));

    ws.on("message", (data) => {
        const message = JSON.parse(data);

        // Broadcast the message to all clients, including the sender
        wss.clients.forEach((client) => {
            if (client.readyState === ws.OPEN) {
                client.send(JSON.stringify(message));
            }
        });
    });

    console.log("Client connected");
});



