import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaService } from 'src/database/prisma.service';
import { CommentsRepository } from './repositories/comment.repository';
import { PrismaCommentsRepository } from './repositories/prisma/prisma.comment.repository';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService,
    {
     provide: CommentsRepository,
     useClass: PrismaCommentsRepository,
   },
 ],
})
export class CommentsModule {}
