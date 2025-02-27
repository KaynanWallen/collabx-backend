import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './repositories/comment.repository';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UpdateCommentDTO } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private CommentsRepository: CommentsRepository) {}

  create(createProfileDto: CreateCommentDTO, userTokenId: number | null) {
    return this.CommentsRepository.create(createProfileDto, userTokenId);
  }

  findAll() {
    return this.CommentsRepository.findAll();
  }

  findAllParentByCommentId(commentId: number) {
    return this.CommentsRepository.findAllParentByCommentId(commentId);
  }

  findAllCommentsReactionsByCommentId(commentId: number) {
    return this.CommentsRepository.findAllCommentsReactionsByCommentId(commentId);
  }


  findOne(id: number) {
    return this.CommentsRepository.findOne(id);
  }

  update(id: number, updateProfileDto: UpdateCommentDTO, userTokenId: number | null) {
    return this.CommentsRepository.update(id, updateProfileDto, userTokenId);
  }

  addReaction(id: number, reactionType: string) {
    return this.CommentsRepository.addReaction(id, reactionType);
  }

  removeReaction(id: number, reactionType: string) {
    return this.CommentsRepository.removeReaction(id, reactionType);
  }

  remove(id: number, userTokenId: number | null) {
    return this.CommentsRepository.remove(id, userTokenId);
  }
}
