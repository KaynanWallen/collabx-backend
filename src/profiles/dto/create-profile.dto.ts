import internal from "stream";

export class CreateProfileDto {
  accountId: number;
  name: string;
  title: string;
  githubLink: string | null;
  linkedinLink: string | null;
  twitterLink: string | null;
  about: string | null;
  techs: string | null;
}
