const router = require("express").Router();

const categoryController = require("../controller/categoryController");

const auth = require("../middleware/auth");

router.get("/read/category/:id", auth, categoryController.readCategory);
// nao esqueça de colocar bearer <valor do token> nas requisições de rota que pedem auth
router.post("/create/category", categoryController.createCategory);
router.patch("/update/category/:id", auth, categoryController.updateCategory);
router.delete("/delete/category/:id", auth, categoryController.deleteCategory);

module.exports = router;