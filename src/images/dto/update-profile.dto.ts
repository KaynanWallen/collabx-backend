import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDTO } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDTO) {}
