import express from "express"
import {registerUser} from "../controllers/authController.js"
import { validateRegister } from "../middlewares/authmiddleware.js";
import { runValidation } from "../middlewares/validationmiddleware.js";

const router = express.Router();

router.post("/register", validateRegister, runValidation,  registerUser)

export default router