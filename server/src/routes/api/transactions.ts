import { Router } from "express";
import { validateRequest, validateToken } from "../../middleware";
import {
  createTransactionController,
  getUserTransaction,
  getUserTransactions,
  getTransactions,
  updateTransactionStatus,
  appealTransaction,
  createComment,
  updateCustomerTransactionStatus,
  appealCustomerTransaction,
  updateCustomerTransactionPhoto,
  updateTransactionPhoto,
} from "../../controllers/transaction";
import { upload } from "../../controllers";

const router = Router();

router.post(
  "/update-comment/:id",
  validateRequest,
  validateToken,
  createComment
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

router.post(
  "/updateTransactionPhoto/:id",
  validateRequest,
  validateToken,
  upload.single("photo"),
  updateTransactionPhoto
);

router.post(
  "/updateCustomerTransactionPhoto/:id",
  validateRequest,
  validateToken,
  upload.single("photo"),
  updateCustomerTransactionPhoto
);

module.exports = router;
