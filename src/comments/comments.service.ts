import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './repositories/comment.repository';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UpdateCommentDTO } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private CommentsRepository: CommentsRepository) {}

  create(createProfileDto: CreateCommentDTO) {
    return this.CommentsRepository.create(createProfileDto);
  }

  findAll() {
    return this.CommentsRepository.findAll();
  }

  findOne(id: number) {
    return this.CommentsRepository.findOne(id);
  }

  update(id: number, updateProfileDto: UpdateCommentDTO) {
    return this.CommentsRepository.update(id, updateProfileDto);
  }

  remove(id: number) {
    return this.CommentsRepository.remove(id);
  }
}
