const router = require("express").Router();

const userController = require("../controller/userController");

const auth = require("../middleware/auth");

router.get("/ver/usuario/:id", auth, userController.readUser);
// nao esqueça de colocar bearer <valor do token> nas requisições de rota que pedem auth
router.post("/login", userController.login);
router.post("/criar/usuario", userController.createUser);
router.patch("/atualizar/usuario/:id", auth, userController.updateUser);
router.delete("/deletar/usuario/:id", auth, userController.deleteUser);

module.exports = router;
