import { CreateProfileDto } from "../dto/create-profile.dto";
import { ProfileDTO } from "../dto/profile.dto";
import { UpdateProfileDto } from "../dto/update-profile.dto";

export abstract class ProfilesRepository {
  abstract create(create_profile: CreateProfileDto): Promise<any>;
  abstract update(profileId: number, update_profile: UpdateProfileDto): Promise<any>;
  abstract findOne(profileId: number): Promise<ProfileDTO | null>;
  abstract findAll(): Promise<ProfileDTO[] | null>;
  abstract remove(id: number): Promise<ProfileDTO | null>;
  
}