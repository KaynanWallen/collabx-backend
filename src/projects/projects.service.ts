import { Injectable } from '@nestjs/common';
import { CreateProjectDTO } from './dto/create-project.dto';
import { UpdateProjectDTO } from './dto/update-project.dto';
import { ProjectsRepository } from './repositories/project.repository';
import { CommentsRepository } from 'src/comments/repositories/comment.repository';

@Injectable()
export class ProjectsService {
  constructor(
    private ProjectsRepository: ProjectsRepository,
    private CommentsRepository: CommentsRepository,
  ) {}

  create(createProfileDto: CreateProjectDTO, userTokenId: number | null) {
    return this.ProjectsRepository.create(createProfileDto, userTokenId);
  }

  addImageProject(file: Express.Multer.File, id: number, userTokenId: number | null){
    return this.ProjectsRepository.addImageProject(file, id, userTokenId)
  }

  findAll() {
    return this.ProjectsRepository.findAll();
  }

  findOne(id: number) {
    return this.ProjectsRepository.findOne(id);
  }

  findCommentsByProjectId(id: number){
    return this.CommentsRepository.findAllByProjectId(id);
  }

  findAllProjectsReactionsByProjectId(projectId: number){
    return this.ProjectsRepository.findAllProjectsReactionsByProjectId(projectId);
  }

  update(id: number, updateProfileDto: UpdateProjectDTO, userTokenId: number | null) {
    return this.ProjectsRepository.update(id, updateProfileDto, userTokenId);
  }

  addReaction(id: number, reactionType: string) {
    return this.ProjectsRepository.addReaction(id, reactionType);
  }

  removeReaction(id: number, reactionType: string) {
    return this.ProjectsRepository.removeReaction(id, reactionType);
  }

  remove(id: number, userTokenId: number | null) {
    return this.ProjectsRepository.remove(id, userTokenId);
  }
}
