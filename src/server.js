const express = require("express");
const server = express();

// Configurar caminhos da minha aplicação
// Página inicial
// Req: Requisição
// Res: Resposta
server.get("/", (req, res) => {
    res.send("Cheguei aqui!");
});

// Ligar o servidor
server.listen(3000);