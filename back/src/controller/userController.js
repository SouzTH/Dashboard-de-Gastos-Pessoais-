const userService = require("../services/userServices.js");
const fs = require("fs").promises;
const path = require("path");

async function readUser(req, res) {
  try {
    const id = req.params.id;
    const usuarios = await userService.readUser(id);

    res.status(200).json({ users: usuarios });
  } catch (e) {
    res.status(500).json({ erro: e.message });
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

    res.status(200).json({ message: userCreate });
  } catch (e) {
    res.status(500).json({ erro: e.message });
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

    res.status(200).json({ message: message });
  } catch (e) {
    res.status(500).json({ erro: e.message });
  }
}

async function login(req, res) {
  try {
    const { email, senha } = req.body;
    const token = await userService.login(email, senha);
    res.status(200).json({ token: token });
  } catch (e) {
    res.status(500).json({ erro: e.message });
  }
}

async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    const message = await userService.deleteUser(id);
    res.status(200).json({ message: message });
  } catch (e) {
    res.status(500).json({ erro: e.message });
  }
}

module.exports = {
  login,
  createUser,
  readUser,
  updateUser,
  deleteUser,
};
