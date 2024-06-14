import express from "express";
import { ResumesController } from "../controllers/resumes.controller.js";
import { createResumeValidator } from "../middlewares/validators/create-resume-validator.middleware.js";
import { updateResumeValidator } from "../middlewares/validators/update-resume-validator.middleware.js";
// import { USER_ROLE } from "../constants/user.constant.js";
// import { requireRoles } from "../middlewares/require-roles.middleware.js";
// import { updateResumeStatusValidator } from "../middlewares/validators/update-resume-status-validator.middleware.js";

const resumesRouter = express.Router();

// PostsController의 인스턴스를 생성합니다.
const resumesController = new ResumesController();

/** 이력서 생성 API **/
resumesRouter.post("/", createResumeValidator, resumesController.createResume);

/** 이력서 목록 조회 API **/
resumesRouter.get("/", resumesController.getResumes);

/** 이력서 상세 조회 API **/
resumesRouter.get("/:id", resumesController.getResumeById);

/** 이력서 수정 API **/
resumesRouter.put(
  "/:id",
  updateResumeValidator,
  resumesController.updateResume,
);

/** 이력서 삭제 API **/
resumesRouter.delete("/:id", resumesController.deleteResume);

// // 이력서 지원 상태 변경
// resumesRouter.patch(
//   "/:id/status",
//   requireRoles([USER_ROLE.RECRUITER]),
//   updateResumeStatusValidator,
//   resumesController,
// );

// // 로그는 마지막에 하기
// resumesRouter.get(
//   "/:id/logs",
//   requireRoles([USER_ROLE.RECRUITER]),
//   resumesController,
// );

export default resumesRouter;
