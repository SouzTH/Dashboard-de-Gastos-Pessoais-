const userService = require("../services/userServices.js");
const fs = require("fs").promises;
const path = require("path");

async function readUser(req, res) {
  try {
    const id = req.params.id;
    const usuarios = await userService.readUser(id);

    res.json({ users: usuarios }).status(200);
  } catch (e) {
    res.json({ erro: e.message }).status(500);
  }
}

async function createUser(req, res) {
  try {
    const { nome, email, senha } = req.body;

    let imagePath = null;

    if (req.files && req.files.foto) {
      const foto = req.files.foto;

      const caminho = `uploads/${Date.now()}_${foto.name}`;

      await foto.mv(caminho);

      imagePath = `/${caminho}`;
    }

    const userCreate = await userService.createUser(
      nome,
      email,
      senha,
      imagePath
    );

    res.json({ message: userCreate }).status(200);
  } catch (e) {
    res.json({ erro: e.message }).status(500);;
  }
}

async function updateUser(req, res) {
  try {
    const { nome, email, senha } = req.body;
    const id = req.params.id;

    let imagePath = null;

    if (req.files && req.files.foto) {
      const foto = req.files.foto;

      const caminho = `uploads/${Date.now()}_${foto.name}`;

      await foto.mv(caminho);

      imagePath = `/${caminho}`;
    }

    const message = await userService.updateUser(
      id,
      nome,
      email,
      senha,
      imagePath
    );

    res.json({ message: message }).status(200);
  } catch (e) {
    res.json({ erro: e.message }).status(500);
  }
}

async function login(req, res) {
  try {
    const { email, senha } = req.body;
    const token = await userService.login(email, senha);
    res.json({ token: token }).status(200);
  } catch (e) {
    res.json({ erro: e.message }).status(500);
  }
}

async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    const message = await userService.deleteUser(id);
    res.json({ message: message }).status(200);
  } catch (e) {
    res.json({ erro: e.message }).status(500);
  }
}

module.exports = {
  login,
  createUser,
  readUser,
  updateUser,
  deleteUser,
};
