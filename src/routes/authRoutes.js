import express from "express"
import {getProfile, isAdmin, loginUser, refreshAccessToken, registerUser} from "../controllers/authController.js"
import { validateRegister, verifyAccessToken } from "../middlewares/authmiddleware.js";
import { runValidation } from "../middlewares/authmiddleware.js";
import { validLogin } from "../middlewares/authmiddleware.js";
import {Admin} from "../middlewares/roleMiddleare.js"
const router = express.Router();

router.post("/register", validateRegister, runValidation, registerUser)
router.post("/login",  validLogin ,runValidation, loginUser )
router.post("/refresh", refreshAccessToken)
router.get("/profile", verifyAccessToken, getProfile )
router.get("/admin", verifyAccessToken, Admin("admin"), isAdmin)

export default router