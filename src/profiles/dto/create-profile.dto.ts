import internal from "stream";

export class CreateProfileDTO {
  accountId: number;
  username: string;
  name: string;
  title: string;
  githubLink: string | null;
  linkedinLink: string | null;
  twitterLink: string | null;
  about: string | null;
  techs: string | null;
}
