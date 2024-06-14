import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";

// User의 컨트롤러(Controller)역할을 하는 클래스
export default class UserController {
  getUsers = async (req, res, next) => {
    try {
      const data = req.user;

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.USERS.READ_ME.SUCCEED,
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}
