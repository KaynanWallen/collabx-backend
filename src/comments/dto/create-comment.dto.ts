import internal from "stream";

export class CreateCommentDTO {
  projectId: number;
  authorId: number;
  parentId: number | null;
  content: string;
}
