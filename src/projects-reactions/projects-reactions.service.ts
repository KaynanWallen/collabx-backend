import { Injectable } from '@nestjs/common';
import { ProjectsReactionsRepository } from './repositories/projects-reactions.repository';
import { CreateProjectsReactionDTO } from './dto/create-projects-reaction.dto';
import { UpdateProjectsReactionDTO } from './dto/update-projects-reaction.dto';

@Injectable()
export class ProjectsReactionsService {
  constructor(private ProjectsReactionsRepository: ProjectsReactionsRepository) {}

  create(createProfileDto: CreateProjectsReactionDTO, userTokenId: number | null) {
    return this.ProjectsReactionsRepository.create(createProfileDto, userTokenId);
  }
  
  toggle(toggleCommentReaction: CreateProjectsReactionDTO, userTokenId: number | null){
    return this.ProjectsReactionsRepository.toggle(toggleCommentReaction, userTokenId);
  }

  findAll() {
    return this.ProjectsReactionsRepository.findAll();
  }

  findOne(id: number) {
    return this.ProjectsReactionsRepository.findOne(id);
  }

  update(id: number, updateProfileDto: UpdateProjectsReactionDTO, userTokenId: number | null) {
    return this.ProjectsReactionsRepository.update(id, updateProfileDto, userTokenId);
  }

  remove(id: number, userTokenId: number | null) {
    return this.ProjectsReactionsRepository.remove(id, userTokenId);
  }
}
