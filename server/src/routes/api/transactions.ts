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
  uploadTxPhoto,
} from "../../controllers/transaction";
import { upload } from "../../controllers";

const router = Router();

router.put(
  "/update-comment/:id",
  validateRequest,
  validateToken,
  createComment
);

router.put(
  "/appeal-transaction/:id",
  validateRequest,
  validateToken,
  appealTransaction
);

router.put(
  "/appeal-customer-transaction/:id",
  validateRequest,
  validateToken,
  appealCustomerTransaction
);

router.put(
  "/update-transaction-status/:id",
  validateRequest,
  validateToken,
  updateTransactionStatus
);

router.put(
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

router.put(
  "/updateTransactionPhoto",
  validateRequest,
  validateToken,
  upload.single("photo"),
  updateTransactionPhoto
);

router.put(
  "/uploadTxPhoto",
  validateRequest,
  validateToken,
  upload.single("photo"),
  uploadTxPhoto
);

router.put(
  "/updateCustomerTransactionPhoto/:id",
  validateRequest,
  validateToken,
  upload.single("photo"),
  updateCustomerTransactionPhoto
);

module.exports = router;
