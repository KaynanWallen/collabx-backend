import { Injectable } from '@nestjs/common';
import { ProjectsReactionsRepository } from './repositories/projects-reactions.repository';
import { CreateProjectsReactionDTO } from './dto/create-comments-reaction.dto';
import { UpdateProjectsReactionDTO } from './dto/update-comments-reaction.dto';

@Injectable()
export class ProjectsReactionsService {
  constructor(private ProjectsReactionsRepository: ProjectsReactionsRepository) {}

  create(createProfileDto: CreateProjectsReactionDTO, userTokenId: number | null) {
    return this.ProjectsReactionsRepository.create(createProfileDto, userTokenId);
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
