import { ImagesModule } from './images/images.module';
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
import { ProjectsReactionsModule } from './projects-reactions/projects-reactions.module';
import { R2BucketModule } from './r2-bucket/r2-bucket.module';
import { ConfigModule } from '@nestjs/config';
import { MeModule } from './me/me.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    AuthModule, 
    AccountsModule, 
    ProfilesModule, 
    ProjectsModule, 
    CommentsModule, 
    ImagesModule, 
    CommentsReactionsModule, 
    ProjectsReactionsModule, 
    R2BucketModule, 
    MeModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService,
     {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
})
export class AppModule {}
