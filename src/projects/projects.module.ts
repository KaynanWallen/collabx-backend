import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { PrismaService } from 'src/database/prisma.service';
import { ProjectsRepository } from './repositories/project.repository';
import { PrismaProjectsRepository } from './repositories/prisma/prisma.project.repository';
import { CommentsModule } from 'src/comments/comments.module';
import { CommentsService } from 'src/comments/comments.service';

@Module({
  imports: [CommentsModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaService,CommentsService,
    {
     provide: ProjectsRepository,
     useClass: PrismaProjectsRepository,
   },
 ],
})
export class ProjectsModule {}
