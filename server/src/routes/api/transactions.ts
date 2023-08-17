import { Router } from "express";
import { validateRequest, validateToken } from "../../middleware";
import {
  createTransactionController,
  getUserTransaction,
  getUserTransactions,
  getTransactions,
  updateTransactionStatus,
  updateTransaction,
} from "../../controllers/transaction";

const router = Router();

router.post(
  "/update-transaction/:id",
  validateRequest,
  validateToken,
  updateTransaction
);

router.post(
  "/update-transaction-status/:id",
  validateRequest,
  validateToken,
  updateTransactionStatus
);

router.get(
  "/get-transaction/:id",
  validateRequest,
  validateToken,
  getUserTransaction
);

router.get(
  "/get-user-transactions",
  validateRequest,
  validateToken,
  getUserTransactions
);

router.get(
  "/get-transactions",
  validateRequest,
  getTransactions
);

router.post(
  "/create-transaction",
  validateRequest,
  validateToken,
  createTransactionController
);

module.exports = router;
