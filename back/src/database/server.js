require("dotenv").config({ quiet: true });
const express = require("express");

const app = express();
const host = process.env.SERVER_HOST; //Se fosse um deploy real, aqui seria o IP.
const port = process.env.SERVER_PORT;

app.use(express.json());

app.listen(port, host, () => {
  console.log("Servidor rodando na porta " + port);
});
