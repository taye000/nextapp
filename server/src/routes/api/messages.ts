import { Router } from "express";
import { validateRequest, validateToken } from "../../middleware";
import { getMessages } from "../../controllers/message";


const router = Router();

router.get(
  "/get-messages/:id",
  validateRequest,
  validateToken,
  getMessages
);

module.exports = router;
