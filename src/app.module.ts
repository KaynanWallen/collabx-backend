import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './database/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { ProfilesModule } from './profiles/profiles.module';
import { ProjectsModule } from './projects/projects.module';
import { CommentsModule } from './comments/comments.module';
import { CommentsReactionsModule } from './comments-reactions/comments-reactions.module';

@Module({
  imports: [AuthModule, AccountsModule, ProfilesModule, ProjectsModule, CommentsModule, CommentsReactionsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService,
     {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
})
export class AppModule {}
