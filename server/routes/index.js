import express from "express";

import authRoute from "./authRoutes.js";
import { register } from "../controllers/authController.js";

const router = express.Router();

const path = "/api-v1/";


router.use(`${path}auth`, authRoute); //api-v1/auth/
export default router;
