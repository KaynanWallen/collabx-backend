import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CommentsReactionsController } from './comments-reactions.controller';
import { CommentsReactionsService } from './comments-reactions.service';
import { CommentsReactionsRepository } from './repositories/comments-reactions.repository';
import { PrismaCommentsReactionsRepository } from './repositories/prisma/prisma.comments-reactions.repository';
import { CommentsService } from 'src/comments/comments.service';
import { CommentsModule } from 'src/comments/comments.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    CommentsModule,
    BullModule.forRoot({
      redis: {
        host: '127.0.0.1',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'commentsReactionsQueue',
    })
  ],
  controllers: [CommentsReactionsController],
  providers: [CommentsReactionsService, PrismaService, CommentsService,
    {
     provide: CommentsReactionsRepository,
     useClass: PrismaCommentsReactionsRepository,
   },
 ],
})
export class CommentsReactionsModule {}
