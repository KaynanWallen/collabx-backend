import { Injectable } from '@nestjs/common';
import { CommentsReactionsRepository } from './repositories/comments-reactions.repository';
import { CreateCommentsReactionDTO } from './dto/create-comments-reaction.dto';
import { UpdateCommentsReactionDTO } from './dto/update-comments-reaction.dto';

@Injectable()
export class CommentsReactionsService {
  constructor(private CommentsReactionsRepository: CommentsReactionsRepository) {}

  create(createProfileDto: CreateCommentsReactionDTO, userTokenId: number | null) {
    return this.CommentsReactionsRepository.create(createProfileDto, userTokenId);
  }

  toggle(toggleCommentReaction: CreateCommentsReactionDTO, userTokenId: number | null){
    return this.CommentsReactionsRepository.toggle(toggleCommentReaction, userTokenId);
  }

  findAll() {
    return this.CommentsReactionsRepository.findAll();
  }

  findOne(id: number) {
    return this.CommentsReactionsRepository.findOne(id);
  }

  update(id: number, updateProfileDto: UpdateCommentsReactionDTO, userTokenId: number | null) {
    return this.CommentsReactionsRepository.update(id, updateProfileDto, userTokenId);
  }

  remove(id: number, userTokenId: number | null) {
    return this.CommentsReactionsRepository.remove(id, userTokenId);
  }
}
