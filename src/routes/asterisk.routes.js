import { Router } from "express";
import * as Asterisk from "../controllers/asterisk.controller";
import auth from '../middleware/auth'   

const router = Router();

router.post("/Call", auth, Asterisk.OriginateCall);

export default router;