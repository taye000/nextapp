import { Router } from "express";
import {
  signin,
  signUp,
  verifyUserLoginByOTP,
  getCurrentUser,
  upload,
  logout,
} from "../../controllers";
import { validateRequest, validateToken } from "../../middleware";
import {
  passwordReset,
  updateProfile,
  updateProfilePhoto,
  updateCoverphoto,
  requestPasswordReset,
  currentUserResetPassword,
} from "../../controllers";

const router = Router();

router.get("/currentuser", validateRequest, validateToken, getCurrentUser);
router.post("/signup", validateRequest, signUp);
router.post("/signin", validateRequest, signin);
router.post("/verifyuser", validateRequest, verifyUserLoginByOTP);
router.post("/signout", validateRequest, validateToken, logout);
router.post("/requestpasswordreset", validateRequest, requestPasswordReset);
router.post("/passwordreset", validateRequest, passwordReset);

router.post(
  "/userpasswordreset",
  validateRequest,
  validateToken,
  currentUserResetPassword
);

router.put("/updateprofile", validateRequest, validateToken, updateProfile);

router.put(
  "/updateprofilephoto",
  validateRequest,
  validateToken,
  upload.single("photo"),
  updateProfilePhoto
);

router.put(
  "/updatecoverphoto",
  validateRequest,
  validateToken,
  upload.single("photo"),
  updateCoverphoto
);

module.exports = router;
