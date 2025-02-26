import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { PrismaService } from 'src/database/prisma.service';
import { ProjectsRepository } from './repositories/project.repository';
import { PrismaProjectsRepository } from './repositories/prisma/prisma.project.repository';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaService,
    {
     provide: ProjectsRepository,
     useClass: PrismaProjectsRepository,
   },
 ],
})
export class ProjectsModule {}
