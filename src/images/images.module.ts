import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { PrismaService } from 'src/database/prisma.service';
import { ImagesRepository } from './repositories/image.repository';
import { PrismaImagesRepository } from './repositories/prisma/prisma.image.repository';
import { R2BucketModule } from 'src/r2-bucket/r2-bucket.module';
import { R2BucketService } from 'src/r2-bucket/r2-bucket.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule, R2BucketModule],
  controllers: [ImagesController],
  providers: [ImagesService, PrismaService, R2BucketService,
    {
     provide: ImagesRepository,
     useClass: PrismaImagesRepository,
   },
 ],
 exports: [ImagesRepository]
})
export class ImagesModule {}
