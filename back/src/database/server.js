require("dotenv").config({ quiet: true });
const fileUpload = require('express-fileupload');
const express = require("express");
const cors = require('cors');
const transactionRoutes = require("../routes/transactionRoutes")
const userRoutes = require("../routes/userRoutes")

const app = express();
const host = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(transactionRoutes);
app.use(userRoutes)

app.listen(port, host, () => {
  console.log("Servidor rodando na porta " + port);
});
