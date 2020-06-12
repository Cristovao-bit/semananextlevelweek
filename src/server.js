const express = require("express");
const server = express();

// Configurar pasta publica
server.use(express.static("public"));

// Configurar caminhos da minha aplicação
// Página inicial
// Req: Requisição
// Res: Resposta
server.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

// Ligar o servidor
server.listen(3000);