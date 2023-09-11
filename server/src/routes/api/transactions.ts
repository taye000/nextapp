import { Router } from "express";
import { validateRequest, validateToken } from "../../middleware";
import {
  createTransactionController,
  getUserTransaction,
  getUserTransactions,
  getTransactions,
  updateTransactionStatus,
  appealTransaction,
  updateComment,
  updateCustomerTransactionStatus,
  appealCustomerTransaction,
} from "../../controllers/transaction";

const router = Router();

router.post(
  "/update-comment/:id",
  validateRequest,
  validateToken,
  updateComment
);

router.post(
  "/appeal-transaction/:id",
  validateRequest,
  validateToken,
  appealTransaction
);

router.post(
  "/appeal-customer-transaction/:id",
  validateRequest,
  validateToken,
  appealCustomerTransaction
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
