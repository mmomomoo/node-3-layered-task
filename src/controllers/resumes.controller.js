import { ResumesService } from "../services/resumes.service.js";
import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";

// Post의 컨트롤러(Controller)역할을 하는 클래스
export class ResumesController {
  resumesService = new ResumesService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.
  //이력서 생성 Controller
  createResume = async (req, res, next) => {
    try {
      // 이거 변경
      const user = req.user;
      const authorId = user.id;
      const { title, content } = req.body;

      // 서비스 계층에 구현된 createResume 로직을 실행합니다.
      const data = await this.resumesService.createResume(
        authorId,
        title,
        content,
      );

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.RESUMES.CREATE.SUCCEED,
        data: data,
      });
    } catch (err) {
      next(err);
    }
  };

  // 이력서 목록 조회 Controller
  getResumes = async (req, res, next) => {
    try {
      const user = req.user;
      const authorId = user.id;
      let { sort, status } = req.query;
      // 서비스 계층에 구현된 findAllResumes 로직을 실행합니다.
      const data = await this.resumesService.findAllResumes(
        user,
        authorId,
        sort,
        status,
      );

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.READ_LIST.SUCCEED,
        data: data,
      });
    } catch (err) {
      next(err);
    }
  };
  //이력서 상세 조회 Controller
  getResumeById = async (req, res, next) => {
    try {
      const user = req.user;
      const authorId = user.id;
      const { id } = req.params;
      // 서비스 계층에 구현된 findResumeById 로직을 실행합니다.
      const data = await this.resumesService.findResumeById(user, authorId, id);
      if (!data) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          status: HTTP_STATUS.NOT_FOUND,
          message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
        });
      }

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.READ_DETAIL.SUCCEED,
        data: data,
      });
    } catch (err) {
      next(err);
    }
  };
  // 이력서 수정 Controller
  updateResume = async (req, res, next) => {
    try {
      const user = req.user;
      const authorId = user.id;
      const { id } = req.params;
      const { title, content } = req.body;

      // 서비스 계층에 구현된 updatePost 로직을 실행합니다.
      const data = await this.resumesService.updateResume(
        authorId,
        id,
        title,
        content,
      );
      if (!data) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          status: HTTP_STATUS.NOT_FOUND,
          message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
        });
      }

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.UPDATE.SUCCEED,
        data: data,
      });
    } catch (err) {
      next(err);
    }
  };
  // 이력서 삭제 Controller
  deleteResume = async (req, res, next) => {
    try {
      const user = req.user;
      const authorId = user.id;
      const { id } = req.params;
      const data = await this.resumesService.deleteResume(id, authorId);

      if (!data) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          status: HTTP_STATUS.NOT_FOUND,
          message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
        });
      }

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.DELETE.SUCCEED,
        data: { id: data.id },
      });
    } catch (err) {
      next(err);
    }
  };
}
