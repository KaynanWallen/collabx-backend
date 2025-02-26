import internal from "stream";

export class CreateProjectDTO {
  authorId: number;
  content: string;
  techs: string | null;
  figmaLink: string | null;
  githubLink: string | null;
  linkedinLink: string | null;
}
