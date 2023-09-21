import { Router } from "express";
import {
  validateRequest,
  validateAdmin,
  validateToken,
} from "../../middleware";
import {
  getTransaction,
  getTransactions,
  updateTransactionStatus,
} from "../../controllers/transaction";
import {
  adminSignUp,
  adminLogin,
  verifyUserLoginByOTP,
  currentUserResetPassword,
  logout,
  passwordReset,
  requestPasswordReset,
  updateProfile,
  updateProfilePhoto,
  getCurrentUser,
} from "../../controllers";

const router = Router();

router.post("/signup", validateRequest, adminSignUp);

router.post("/signin", validateRequest, adminLogin);

router.post("/verifyuser", validateRequest, verifyUserLoginByOTP);

router.post("/signout", validateRequest, validateAdmin, validateToken, logout);

router.post("/requestpasswordreset", validateRequest, requestPasswordReset);

router.post("/passwordreset", validateRequest, passwordReset);

router.get(
  "/currentuser",
  validateRequest,
  validateToken,
  validateAdmin,
  getCurrentUser
);

router.post(
  "/userpasswordreset",
  validateRequest,
  validateToken,
  validateAdmin,
  currentUserResetPassword
);

router.post(
  "/updateprofile",
  validateRequest,
  validateToken,
  validateAdmin,
  updateProfile
);

router.post(
  "/updateprofilephoto",
  validateRequest,
  validateToken,
  validateAdmin,
  updateProfilePhoto
);

router.get(
  "/get-transaction/:id",
  validateRequest,
  validateToken,
  validateAdmin,
  getTransaction
);

router.get(
  "/get-transactions",
  validateRequest,
  validateToken,
  validateAdmin,
  getTransactions
);

router.post(
  "/update-transaction-status/:id",
  validateRequest,
  validateToken,
  validateAdmin,
  updateTransactionStatus
);


module.exports = router;
