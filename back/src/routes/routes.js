const router = require("express").Router();

const userController = require("../controller/userController");

const auth = require("../middleware/auth");

router.get("/ver/usuario/:id", auth, userController.readUser);
// nao esqueça de colocar bearer <valor do token> nas requisições de rota que pedem auth
router.post("/login", userController.login);

module.exports = router;
