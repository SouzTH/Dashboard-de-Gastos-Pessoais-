const router = require("express").Router();
const transactionController = require("../controller/transactionController");

const auth = require("../middleware/auth");

router.get("/read/transaction/:id", auth, transactionController.getAllTransactions);
// nao esqueça de colocar bearer <valor do token> nas requisições de rota que pedem auth
router.post("/create/transaction", auth, transactionController.createTransaction);
router.patch("/update/transaction/:id", auth, transactionController.updateTransaction);
router.delete("/delete/transaction/:id", auth, transactionController.deleteTransaction);

module.exports = router;