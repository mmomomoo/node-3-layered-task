import express from "express";
import { requireAccessToken } from "../middlewares/require-access-token.middleware.js";
import UsersController from "../controllers/users.controller.js";

const usersRouter = express.Router();

// UsersController의 인스턴스를 생성합니다.
const usersController = new UsersController();

// // 내 정보 조회 API
usersRouter.get("/me", requireAccessToken, usersController.getUsers);

export default usersRouter;
