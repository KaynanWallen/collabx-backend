import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from 'src/database/prisma.service';
import { AccountsRepository } from '../account.repository';
import { FindAccountDto } from 'src/accounts/dto/find-account.dto';
import { ProfileDTO } from 'src/profiles/dto/profile.dto';

@Injectable()
export class PrismaAccountsRepository implements AccountsRepository {
  constructor(private prisma: PrismaService) {}
  
  async findByEmail(email: string): Promise<FindAccountDto & {profile: ProfileDTO | null}  | null> {
    const accountRecord = await this.prisma.account.findUnique({
      where: {
        email: email,
      }
    })

    if(!accountRecord){
      return accountRecord
    }

    const profileRecord = await this.prisma.profile.findFirst({
      where: {
       accountId : accountRecord.id,
      }
    })

    return {
      ...accountRecord,
      profile: profileRecord,
    }
  }

  async findById(id: number): Promise<FindAccountDto | null> {
    return this.prisma.account.findUnique({
      where: {
        id: id,
      }
    }) 
  }
}