import express from "express"
import {loginUser, registerUser} from "../controllers/authController.js"
import { validateRegister } from "../middlewares/authmiddleware.js";
import { runValidation } from "../middlewares/validationmiddleware.js";
import { validLogin } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.post("/register", validateRegister, runValidation, registerUser)
router.post("/login",  validLogin ,runValidation, loginUser )

export default router