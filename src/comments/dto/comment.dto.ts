export class CommentDTO {
  id: number;
  projectId: number;
  authorId: number;
  parentId: number | null;
  content: string;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
  createdAt: Date;
  lastModified: Date;
}
