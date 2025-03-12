import internal from "stream";

export class CreateProjectDTO {
  authorId: number;
  title: string;
  content: string;
  techs: string | null;
  figmaLink: string | null;
  githubLink: string | null;
  linkedinLink: string | null;
}
