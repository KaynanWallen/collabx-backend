export class CommentsReactionDTO {
  id: number;
  commentId: number;
  authorId: number;
  reactionType: string;
  createdAt: Date;
  lastModified: Date;
}
