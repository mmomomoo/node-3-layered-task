import { prisma } from "../utils/prisma.util.js";

export class ResumesRepository {
  //이력서 생성 Repository
  createResume = async (authorId, title, content) => {
    // ORM인 Prisma에서 Posts 모델의 create 메서드를 사용해 데이터를 요청합니다.
    const createdResumes = await prisma.resume.create({
      data: {
        authorId,
        title,
        content,
      },
    });

    return createdResumes;
  };

  // 이력서 목록 조회 Repository
  findAllResumes = async (whereCondition, sort) => {
    // ORM인 Prisma에서 Resumes 모델의 findMany 메서드를 사용해 데이터를 요청합니다.
    const resumes = await prisma.resume.findMany({
      where: whereCondition,
      orderBy: {
        createdAt: sort,
      },
      include: {
        author: true,
      },
    });

    return resumes;
  };
  //이력서 상세 조회 Repository
  findResumeById = async (whereCondition) => {
    // ORM인 Prisma에서 Posts 모델의 findUnique 메서드를 사용해 데이터를 요청합니다.
    const resumes = await prisma.resume.findUnique({
      where: whereCondition,
      include: { author: true },
    });

    return resumes;
  };
  // 이력서 수정 Repository + 삭제에서도 씀
  //   조건에 맞는 이력서 찾기
  findResumeByCondition = async (whereCondition) => {
    return prisma.resume.findUnique({
      where: whereCondition,
    });
  };

  // 이력서 수정
  updateResume = async (id, title, content) => {
    // 먼저 이력서가 존재하는지 확인합니다.
    let existedResume = await prisma.resume.findUnique({
      where: { id: +id },
    });

    if (!existedResume) {
      return null;
    }

    // Prisma의 update 메서드를 사용하여 이력서를 수정합니다.
    const updatedResume = await prisma.resume.update({
      where: { id: +id },
      data: {
        ...(title && { title }),
        ...(content && { content }),
      },
    });

    return updatedResume;
  };
  // 이력서 삭제 Repository
  deleteResume = async (id) => {
    // ORM인 Prisma에서 Posts 모델의 delete 메서드를 사용해 데이터를 삭제합니다.
    const deletedResume = await prisma.resume.delete({
      where: { id: +id },
    });

    return deletedResume;
  };
}
