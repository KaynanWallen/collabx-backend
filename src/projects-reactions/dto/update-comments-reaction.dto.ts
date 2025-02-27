import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectsReactionDTO } from './create-comments-reaction.dto';

export class UpdateProjectsReactionDTO extends PartialType(CreateProjectsReactionDTO) {}
