import { Injectable } from '@nestjs/common';
import { ProfilesService } from 'src/profiles/profiles.service';

@Injectable()
export class MeService {
  constructor(private readonly profilesService: ProfilesService) {}

 
  findInfos({profileId, id}: {profileId: number | null, id: number}) {
    if(!profileId) return 'Not Found'
    const profileRecord = this.profilesService.findOne(profileId)
    return profileRecord
  }
}
