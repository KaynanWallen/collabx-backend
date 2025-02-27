import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentsReactionDTO } from './create-comments-reaction.dto';

export class UpdateCommentsReactionDTO extends PartialType(CreateCommentsReactionDTO) {}
