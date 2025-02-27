import { CommentsReactionDTO } from "../dto/comments-reaction.dto";
import { CreateCommentsReactionDTO } from "../dto/create-comments-reaction.dto";
import { UpdateCommentsReactionDTO } from "../dto/update-comments-reaction.dto";

export abstract class CommentsReactionsRepository {
  abstract create(create_commentsReaction: CreateCommentsReactionDTO, userTokenId: number | null): Promise<any>;
  abstract update(commentsReactionId: number, update_commentsReaction: UpdateCommentsReactionDTO, userTokenId: number | null): Promise<any>;
  abstract findOne(commentsReactionId: number): Promise<CommentsReactionDTO | null>;
  abstract findAllByProfileId(profileId: number): Promise<CommentsReactionDTO[] | null>;
  abstract findAll(): Promise<CommentsReactionDTO[] | null>;
  abstract remove(id: number, userTokenId: number | null): Promise<CommentsReactionDTO | null>;
}