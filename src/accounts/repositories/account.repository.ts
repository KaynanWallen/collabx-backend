export abstract class AccountsRepository {
  abstract findByEmail(email: string): Promise<any>;
}