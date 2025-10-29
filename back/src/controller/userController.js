const userService = require("../services/userServices.js");
const fs = require("fs").promises; // Para criar diretórios
const path = require("path"); // Para construir caminhos

async function readUser(req, res) {
  try {
    const id = req.params.id;
    const usuarios = await userService.readUser(id);

    res.json({ users: usuarios }).status(200);
  } catch (e) {
    res.json({ erro: e.message });
  }
}

async function login(req, res) {
  try {
    const { email, senha } = req.body;
    const token = await userService.login(email, senha);
    res.json({ token: token }).status(200);
  } catch (e) {
    res.json({ erro: e.message });
  }
}

module.exports = {
  login,
  createUser,
  readUser,
  updateUser,
  deleteUser,
};
