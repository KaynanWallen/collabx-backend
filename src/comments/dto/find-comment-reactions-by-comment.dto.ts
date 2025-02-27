import { ProfileDTO } from "src/profiles/dto/profile.dto";

export class FindCommentReactionsByCommentDTO {
  id: number;
  commentId: number;
  authorId: number;
  reactionType: string;
  createdAt: Date;
  lastModified: Date;
  author: ProfileDTO;
}
