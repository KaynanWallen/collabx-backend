import { ProfileDTO } from "src/profiles/dto/profile.dto";

export class FindProjectsReactionsByProjectDTO {
  id: number;
  projectId: number;
  authorId: number;
  reactionType: string;
  createdAt: Date;
  lastModified: Date;
  author: ProfileDTO;
}
