import { Router } from "express";
import * as ApiBase from "../controllers/api.base.controller";
import auth from '../middleware/auth'   

const router = Router();

router.post("/StatusApiBase", auth, ApiBase.StatusApiBase);

export default router;