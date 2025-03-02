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

@Module({
  imports: [ProjectsModule, CommentsModule, ImagesModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaService,CommentsService,ImagesService,
    {
     provide: ProjectsRepository,
     useClass: PrismaProjectsRepository,
   },
 ],
 exports: [ProjectsRepository]
})
export class ProjectsModule {}
