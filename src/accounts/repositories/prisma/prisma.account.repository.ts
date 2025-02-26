import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from 'src/database/prisma.service';
import { AccountsRepository } from '../account.repository';
import { FindAccountDto } from 'src/accounts/dto/find-account.dto';

@Injectable()
export class PrismaAccountsRepository implements AccountsRepository {
  constructor(private prisma: PrismaService) {}
  
  async findByEmail(email: string): Promise<FindAccountDto | null> {
    return this.prisma.account.findUnique({
      where: {
        email: email,
      }
    })
  }

  async findById(id: number): Promise<FindAccountDto | null> {
    return this.prisma.account.findUnique({
      where: {
        id: id,
      }
    }) 
  }
}