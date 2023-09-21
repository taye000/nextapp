import { Router } from "express";
import { validateRequest, validateToken } from "../../middleware";
import { getUserMessage, getUserMessages } from "../../controllers/message";

const router = Router();

router.get(
  "/get-user-message/:id",
  validateRequest,
  validateToken,
  getUserMessage
);

router.get(
  "/get-user-messages",
  validateRequest,
  validateToken,
  getUserMessages
);

module.exports = router;
