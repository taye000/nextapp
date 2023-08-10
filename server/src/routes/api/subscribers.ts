import { Router } from "express";
import { validateRequest } from "../../middleware";
import { subscribe } from "../../controllers/subscriber";

const router = Router();

router.post("/subscribe", validateRequest, subscribe);

module.exports = router;
