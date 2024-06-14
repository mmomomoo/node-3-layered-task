import { prisma } from "../utils/prisma.util.js";

export class AuthRepository {
  // 이메일을 이용해 이미 있는 유저인지 확인할 때 사용
  async findUserByEmail(email) {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }

  // 회원가입에서 유저 만들때 사용
  async createUser(email, hashedPassword, name) {
    const createdUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    return createdUser;
  }

  // 로그아웃할 때 토큰을 null로 업데이트
  async updateToken(userId) {
    const updatedToken = await prisma.refreshToken.update({
      where: { userId },
      data: {
        refreshToken: null,
      },
    });
    return updatedToken;
  }

  // 리프레시 토큰을 삽입 또는 업데이트
  async upsertToken(userId, hashedRefreshToken) {
    const upsertedToken = await prisma.refreshToken.upsert({
      where: { userId },
      update: {
        refreshToken: hashedRefreshToken,
      },
      create: {
        userId,
        refreshToken: hashedRefreshToken,
      },
    });
    return upsertedToken;
  }
}
