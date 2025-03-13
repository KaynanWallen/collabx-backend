export class ProjectDTO {
  id: number;
  title: string;
  authorId: number;
  content: string;
  techs: string | null;
  figmaLink: string | null;
  githubLink: string | null;
  linkedinLink: string | null;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
  projectImage?: string | null;
  createdAt: Date;
  lastModified: Date;
}
