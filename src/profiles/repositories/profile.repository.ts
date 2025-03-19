import { ProjectDTO } from "src/projects/dto/project.dto";
import { CreateProfileDTO } from "../dto/create-profile.dto";
import { ProfileDTO } from "../dto/profile.dto";
import { UpdateProfileDto } from "../dto/update-profile.dto";

export abstract class ProfilesRepository {
  abstract create(create_profile: CreateProfileDTO, userTokenId: number | null): Promise<any>;
  abstract update(profileId: number, update_profile: UpdateProfileDto, userTokenId: number | null): Promise<any>;
  abstract findOne(profileId: number): Promise<ProfileDTO | null>;
  abstract findOneByUsername(username: string): Promise<ProfileDTO | null>;
  abstract findAll(): Promise<ProfileDTO[] | null>;
  abstract remove(id: number, userTokenId: number | null): Promise<ProfileDTO | null>;
  
}