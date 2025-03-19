import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { MeController } from './me.controller';
import { MeService } from './me.service';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { ProfilesService } from 'src/profiles/profiles.service';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports: [ProfilesModule, ProjectsModule],
  controllers: [MeController],
  providers: [MeService, PrismaService, ProfilesService]
})
export class MeModule {}
