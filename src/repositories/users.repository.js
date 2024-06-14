// // // users.repository.js
// import { prisma } from "../utils/prisma.util.js";

// // export class UsersRepository {
// //   findAllUsers = async () => {
// //     // ORM인 Prisma에서 User 모델의 findUnique 메서드를 사용해 데이터를 요청합니다.
// //     const user = await prisma.user.findUnique({
// //       where: { id: userId },
// //     });
// //     return user;
// //   };
// // }
// import { prisma } from "../utils/prisma.util.js";

// export class UsersRepository {
//   //이메일을 이용해 유저가 존재하는지 확인
//   findUserByEmail = async (email) => {
//     // ORM인 Prisma에서 User 모델의 findUnique 메서드를 사용해 데이터를 요청합니다.
//     const existedUser = await prisma.user.findUnique({ where: { email } });
//     return existedUser;
//   };
//   createUser = async (data) => {
//     const user = await prisma.user.create({
//       data,
//     });
//     return user;
//   };
// }
