import { CommentDTO } from "../dto/comment.dto";
import { CreateCommentDTO } from "../dto/create-comment.dto";
import { UpdateCommentDTO } from "../dto/update-comment.dto";

export abstract class CommentsRepository {
  abstract create(create_comment: CreateCommentDTO, userTokenId: number | null): Promise<any>;
  abstract update(commentId: number, update_comment: UpdateCommentDTO, userTokenId: number | null): Promise<any>;
  abstract findOne(commentId: number): Promise<CommentDTO | null>;
  abstract findAllByProjectId(projectId: number): Promise<CommentDTO[] | null>;
  abstract findAll(): Promise<CommentDTO[] | null>;
  abstract remove(id: number, userTokenId: number | null): Promise<CommentDTO | null>;
}