import { Router } from "express";
import { validateRequest, validateToken } from "../../middleware";
import {
  createTransactionController,
  getUserTransaction,
  getUserTransactions,
  getTransactions,
  updateTransactionStatus,
  appealTransaction,
  updateTransaction,
  updateCustomerTransactionStatus,
} from "../../controllers/transaction";

const router = Router();

router.post(
  "/update-transaction/:id",
  validateRequest,
  validateToken,
  updateTransaction
);

router.post(
  "/appeal-transaction/:id",
  validateRequest,
  validateToken,
  appealTransaction
);

router.post(
  "/update-transaction-status/:id",
  validateRequest,
  validateToken,
  updateTransactionStatus
);

router.post(
  "/update-customer-transaction-status/:id",
  validateRequest,
  validateToken,
  updateCustomerTransactionStatus
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

router.get("/get-transactions", validateRequest, getTransactions);

router.post(
  "/create-transaction",
  validateRequest,
  validateToken,
  createTransactionController
);

module.exports = router;
