import { Injectable } from '@nestjs/common';
import { CreateProjectDTO } from './dto/create-project.dto';
import { UpdateProjectDTO } from './dto/update-project.dto';
import { ProjectsRepository } from './repositories/project.repository';

@Injectable()
export class ProjectsService {
  constructor(private ProjectsRepository: ProjectsRepository) {}

  create(createProfileDto: CreateProjectDTO) {
    return this.ProjectsRepository.create(createProfileDto);
  }

  findAll() {
    return this.ProjectsRepository.findAll();
  }

  findOne(id: number) {
    return this.ProjectsRepository.findOne(id);
  }

  update(id: number, updateProfileDto: UpdateProjectDTO) {
    return this.ProjectsRepository.update(id, updateProfileDto);
  }

  remove(id: number) {
    return this.ProjectsRepository.remove(id);
  }
}
