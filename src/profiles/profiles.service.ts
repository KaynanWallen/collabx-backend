import { Injectable } from '@nestjs/common';
import { CreateProfileDTO } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesRepository } from './repositories/profile.repository';
import { ProjectsRepository } from 'src/projects/repositories/project.repository';

@Injectable()
export class ProfilesService {
  constructor(
    private ProfilesRepository: ProfilesRepository,
    private ProjectsRepository: ProjectsRepository
  ) {}

  create(createProfileDto: CreateProfileDTO, userTokenId: number | null) {
    return this.ProfilesRepository.create(createProfileDto, userTokenId);
  }

  findAll() {
    return this.ProfilesRepository.findAll();
  }

  findOne(id: number) {
    return this.ProfilesRepository.findOne(id);
  }

  findAllProjectsByProfileId(id: number){
    return this.ProjectsRepository.findAllByProfileId(id)
  }

  findOneByUsername(username: string) {
    return this.ProfilesRepository.findOneByUsername(username);
  }

  update(id: number, updateProfileDto: UpdateProfileDto, userTokenId: number | null) {
    return this.ProfilesRepository.update(id, updateProfileDto, userTokenId);
  }

  remove(id: number, userTokenId: number | null) {
    return this.ProfilesRepository.remove(id, userTokenId);
  }
}
