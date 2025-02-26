import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from 'src/database/prisma.service';
import { AccountsRepository } from '../account.repository';

@Injectable()
export class PrismaAccountsRepository implements AccountsRepository {
  constructor(private prisma: PrismaService) {}
  
  async findByEmail(email: string): Promise<any> {
    return this.prisma.account.findUnique({
      where: {
        email: email,
      }
    })
  }
}