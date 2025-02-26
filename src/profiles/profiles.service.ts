import { Injectable } from '@nestjs/common';
import { CreateProfileDTO } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesRepository } from './repositories/profile.repository';

@Injectable()
export class ProfilesService {
  constructor(private ProfilesRepository: ProfilesRepository) {}

  create(createProfileDto: CreateProfileDTO) {
    return this.ProfilesRepository.create(createProfileDto);
  }

  findAll() {
    return this.ProfilesRepository.findAll();
  }

  findOne(id: number) {
    return this.ProfilesRepository.findOne(id);
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return this.ProfilesRepository.update(id, updateProfileDto);
  }

  remove(id: number) {
    return this.ProfilesRepository.remove(id);
  }
}
