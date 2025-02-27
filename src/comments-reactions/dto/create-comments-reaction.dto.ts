import internal from "stream";

export class CreateCommentsReactionDTO {
  commentId: number;
  authorId: number;
  reactionType: string;
}
