import { FindAccountDto } from "../dto/find-account.dto";

export abstract class AccountsRepository {
  abstract findByEmail(email: string): Promise<FindAccountDto | null>;
  abstract findById(id: number): Promise<FindAccountDto | null>;
}