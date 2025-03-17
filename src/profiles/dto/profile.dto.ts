export class ProfileDTO {
  id: number;
  accountId: number;
  username: string;
  name: string;
  title: string;
  githubLink: string | null;
  linkedinLink: string | null;
  twitterLink: string | null
  about: string | null;
  techs: string | null;
  followersCount: number;
  followingCount: number;
  createdAt: Date;
  lastModified: Date;
}
