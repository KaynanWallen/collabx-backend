import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaAccountsRepository } from './repositories/prisma/prisma.account.repository';
import { AccountsRepository } from './repositories/account.repository';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, PrismaService,
     {
      provide: AccountsRepository,
      useClass: PrismaAccountsRepository,
    },
  ],
})
export class AccountsModule {}
