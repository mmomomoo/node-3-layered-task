import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { MESSAGES } from "../constants/message.constant.js";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  HASH_SALT_ROUNDS,
  REFRESH_TOKEN_EXPIRES_IN,
} from "../constants/auth.constant.js";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from "../constants/env.constant.js";
import { AuthRepository } from "../repositories/auth.repository.js";
import { HttpError } from "../errors/http.error.js";

class AuthService {
  constructor() {
    this.authRepository = new AuthRepository(); // AuthRepository 인스턴스를 생성하여 멤버 변수로 할당합니다.
  }

  async signUp(email, password, name) {
    const existedUser = await this.authRepository.findUserByEmail(email);

    if (existedUser) {
      throw new HttpError.Conflict(MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED);
    }

    const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);
    const data = await this.authRepository.createUser(
      email,
      hashedPassword,
      name,
    );

    data.password = undefined;
    return data;
  }

  async signIn(email, password) {
    const user = await this.authRepository.findUserByEmail(email);

    const isPasswordMatched =
      user && bcrypt.compareSync(password, user.password);

    if (!isPasswordMatched) {
      throw new HttpError.Unauthorized(MESSAGES.AUTH.COMMON.UNAUTHORIZED);
    }

    const payload = { id: user.id };
    const data = await this.generateAuthTokens(payload);

    return data;
  }

  async signOut(userId) {
    await this.authRepository.updateToken(userId);
  }

  async generateTokens(userId) {
    const payload = { id: userId };
    const data = await this.generateAuthTokens(payload);

    return data;
  }

  async generateAuthTokens(payload) {
    const userId = payload.id;

    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });

    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });

    const hashedRefreshToken = bcrypt.hashSync(refreshToken, HASH_SALT_ROUNDS);

    await this.authRepository.upsertToken(userId, hashedRefreshToken);

    return { accessToken, refreshToken };
  }
}

export { AuthService };
