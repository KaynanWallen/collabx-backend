import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectsReactionDTO } from './create-projects-reaction.dto';

export class UpdateProjectsReactionDTO extends PartialType(CreateProjectsReactionDTO) {}
