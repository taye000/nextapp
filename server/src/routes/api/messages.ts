import { Router } from "express";
import { validateRequest, validateToken } from "../../middleware";
import { getTXUserMessages, getUserMessage, getUserMessages } from "../../controllers/message";

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

router.get(
  "/get-tx-user-messages/:id",
  validateRequest,
  validateToken,
  getTXUserMessages
)

module.exports = router;
