import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants/constants';
import { AccountsModule } from 'src/accounts/accounts.module';
import { PrismaService } from 'src/database/prisma.service';
import { AccountsRepository } from 'src/accounts/repositories/account.repository';
import { PrismaAccountsRepository } from 'src/accounts/repositories/prisma/prisma.account.repository';
import { AccountsService } from 'src/accounts/accounts.service';

@Module({
  imports: [
    AccountsModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    AccountsService,
    {
      provide: AccountsRepository,
      useClass: PrismaAccountsRepository,
    },
  ],
})
export class AuthModule {}