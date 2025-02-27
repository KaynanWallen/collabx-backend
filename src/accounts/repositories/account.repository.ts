import { ProfileDTO } from "src/profiles/dto/profile.dto";
import { FindAccountDto } from "../dto/find-account.dto";

export abstract class AccountsRepository {
  abstract findByEmail(email: string): Promise<FindAccountDto & {profile: ProfileDTO | null}  | null>;
  abstract findById(id: number): Promise<FindAccountDto | null>;
}