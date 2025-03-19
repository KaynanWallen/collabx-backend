import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { PrismaService } from 'src/database/prisma.service';
import { ProfilesRepository } from './repositories/profile.repository';
import { PrismaProfilesRepository } from './repositories/prisma/prisma.profile.repository';
import { ProjectsModule } from 'src/projects/projects.module';
import { MeModule } from 'src/me/me.module';

@Module({
  imports: [ProjectsModule],
  controllers: [ProfilesController],
  providers: [ProfilesService, PrismaService,
    {
     provide: ProfilesRepository,
     useClass: PrismaProfilesRepository,
   },
 ],
exports: [ProfilesRepository],
})
export class ProfilesModule {}
