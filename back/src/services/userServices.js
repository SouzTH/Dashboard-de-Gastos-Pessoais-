const database = require("../database/export");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function readUser(id) {
  const usuario = await database("usuario")
    .select("*")
    .where({ id: id })
    .first();

  if (usuario.length === 0) {
    throw new Error("Nao tem registro!");
  }

  return usuario;
}

async function login(email, senha) {
  const usuario = await database("usuario")
    .select("*")
    .where({ email: email })
    .first();

  if (!usuario) {
    throw new Error("Não tem aqui");
  }

  const compara = bcrypt.compareSync(senha, usuario.senha);
  if (!compara) {
    throw new Error("Senha incorreta!");
  }

  const payload = {
    id: usuario.id,
  };

  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "24h" });

  return token; //verificar depois na .env
}

module.exports = {
  login,
  createUser,
  readUser,
  updateUser,
  deleteUser,
};
