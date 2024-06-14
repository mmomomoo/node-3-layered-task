import express from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { signUpValidator } from "../middlewares/validators/sign-up-validator.middleware.js";
import { signInValidator } from "../middlewares/validators/sign-in-validator.js";
import { requireRefreshToken } from "../middlewares/require-refresh-token.middleware.js";

const authRouter = express.Router();

// AuchsController의 인스턴스를 생성합니다.
const authController = new AuthController();

// 회원가입 API
authRouter.post("/sign-up", signUpValidator, authController.signUp);
// 로그인 API
authRouter.post("/sign-in", signInValidator, authController.signIn);
// 토큰 API
authRouter.post("/token", requireRefreshToken, authController.token);
// 로그아웃 API
authRouter.post("/sign-out", requireRefreshToken, authController.signOut);

export default authRouter;
