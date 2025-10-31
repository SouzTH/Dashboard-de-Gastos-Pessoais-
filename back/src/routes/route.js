const router = require("express").Router();
const transactionController = require("../controller/transactionController");

//const auth = require("../middleware/auth");

router.get("/read/transaction/:id",  transactionController.getAllTransactions);
// nao esqueça de colocar bearer <valor do token> nas requisições de rota que pedem auth
router.post("/create/transaction", transactionController.createTransaction);
//router.patch("/update/transaction/:id", auth, transactionController.updatetransaction);
//router.delete("/delete/transaction/:id", auth, transactionController.deletetransaction);

module.exports = router;