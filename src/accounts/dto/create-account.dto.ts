export class CreateAccountDto {
  email: string;
  password: string;
  twoFactor: boolean;
  createdAt: Date;
  lastModified: Date;
}
