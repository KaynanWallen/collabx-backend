export class FindAccountDto {
  id: number;
  email: string;
  password: string;
  twoFactor: boolean;
  createdAt: Date;
  lastModified: Date;
}
