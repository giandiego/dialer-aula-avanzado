import auth from '../middleware/auth';
import { Router } from "express";
import * as Authenticate from "../controllers/auth.controller";

const router = Router();

router.post("/", Authenticate.Authorization);
router.post("/Logout", auth, Authenticate.LogoutUser);
router.post("/LogoutAll", auth, Authenticate.LogoutAll);
export default router;