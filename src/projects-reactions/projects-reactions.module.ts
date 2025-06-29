import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ProjectsReactionsController } from './projects-reactions.controller';
import { ProjectsReactionsService } from './projects-reactions.service';
import { ProjectsReactionsRepository } from './repositories/projects-reactions.repository';
import { PrismaProjectsReactionsRepository } from './repositories/prisma/prisma.projects-reactions.repository';
import { ProjectsService } from 'src/projects/projects.service';
import { ProjectsModule } from 'src/projects/projects.module';
import { CommentsModule } from 'src/comments/comments.module';
import { BullModule } from '@nestjs/bull';
import { QueueConsumers } from './queue';

@Module({
  imports: [ProjectsModule, CommentsModule, BullModule.registerQueue({
    name: 'projectsReactionsQueue',
  })],
  controllers: [ProjectsReactionsController],
  providers: [ProjectsReactionsService, PrismaService, ProjectsService, ...QueueConsumers,
    {
      provide: ProjectsReactionsRepository,
      useClass: PrismaProjectsReactionsRepository,
    },
  ],
})
export class ProjectsReactionsModule { }
