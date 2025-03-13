import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { PrismaService } from 'src/database/prisma.service';
import { ProjectsRepository } from './repositories/project.repository';
import { PrismaProjectsRepository } from './repositories/prisma/prisma.project.repository';
import { CommentsModule } from 'src/comments/comments.module';
import { CommentsService } from 'src/comments/comments.service';
import { ImagesModule } from 'src/images/images.module';
import { ImagesService } from 'src/images/images.service';
import { R2BucketService } from 'src/r2-bucket/r2-bucket.service';
import { R2BucketModule } from 'src/r2-bucket/r2-bucket.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ProjectsModule, CommentsModule, ImagesModule, R2BucketModule, ConfigModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaService,CommentsService,ImagesService, R2BucketService,
    {
     provide: ProjectsRepository,
     useClass: PrismaProjectsRepository,
   },
 ],
 exports: [ProjectsRepository]
})
export class ProjectsModule {}
