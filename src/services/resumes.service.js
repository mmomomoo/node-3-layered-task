import { ResumesRepository } from "../repositories/resumes.repository.js";
import { USER_ROLE } from "../constants/user.constant.js";
// import { MESSAGES } from "../constants/message.constant.js";
// import { HTTP_STATUS } from "../constants/http-status.constant.js";

export class ResumesService {
  resumesRepository = new ResumesRepository();

  //이력서 생성 Service
  createResume = async (authorId, title, content) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const createdResume = await this.resumesRepository.createResume(
      authorId,
      title,
      content,
    );

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return {
      authorId: createdResume.authorId,
      title: createdResume.title,
      content: createdResume.content,
      createdAt: createdResume.createdAt,
      updatedAt: createdResume.updatedAt,
    };
  };

  // 이력서 목록 조회 Service
  findAllResumes = async (user, authorId, sort, status) => {
    sort = sort?.toLowerCase();
    if (sort !== "desc" && sort !== "asc") {
      sort = "desc";
    }
    const whereCondition = {};
    // 채용 담당자인 경우
    if (user.role === USER_ROLE.RECRUITER) {
      if (status) {
        whereCondition.status = status;
      }
    }
    // 채용 담당자가 아닌 경우
    else {
      // 자신이 작성한 이력서만 조회
      whereCondition.authorId = authorId;
    }

    const data = await this.resumesRepository.findAllResumes(
      whereCondition,
      sort,
    );

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return data.map((resume) => {
      return {
        id: resume.id,
        authorName: resume.author.name,
        title: resume.title,
        content: resume.content,
        status: resume.status,
        createdAt: resume.createdAt,
        updatedAt: resume.updatedAt,
      };
    });
  };

  //이력서 상세 조회 Service
  findResumeById = async (user, authorId, id) => {
    const whereCondition = { id: +id };

    if (user.role !== USER_ROLE.RECRUITER) {
      whereCondition.authorId = authorId;
    }

    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const data = await this.resumesRepository.findResumeById(whereCondition);

    return {
      id: data.id,
      authorName: data.author.name,
      title: data.title,
      content: data.content,
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  };

  // 이력서 수정 Service
  updateResume = async (authorId, id, title, content) => {
    const whereCondition = { id: +id, authorId: authorId };

    const existedResume =
      await this.resumesRepository.findResumeByCondition(whereCondition);

    if (!existedResume) {
      return null;
    }

    return this.resumesRepository.updateResume(id, title, content);
  };
  // 이력서 삭제 Service
  deleteResume = async (authorId, id) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const whereCondition = { id: +id, authorId: authorId };

    const existedResume =
      await this.resumesRepository.findResumeByCondition(whereCondition);

    if (!existedResume) {
      return null;
    }

    // 저장소(Repository)에게 데이터 삭제를 요청합니다.
    return this.resumesRepository.deleteResume(id, authorId);
  };
}
