import { AuthService } from "../services/auth.service.js";
import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";

class AuthController {
  constructor() {
    this.authService = new AuthService(); // AuthService 인스턴스를 생성하여 멤버 변수로 할당합니다.
  }

  async signUp(req, res, next) {
    try {
      const { email, password, name } = req.body;
      const data = await this.authService.signUp(email, password, name);

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const data = await this.authService.signIn(email, password);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async token(req, res, next) {
    try {
      const user = req.user;
      const data = await this.authService.generateTokens(user.id);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.AUTH.TOKEN.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async signOut(req, res, next) {
    try {
      const user = req.user;
      await this.authService.signOut(user.id);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.AUTH.SIGN_OUT.SUCCEED,
        data: { id: user.id },
      });
    } catch (error) {
      next(error);
    }
  }
}

export { AuthController };
