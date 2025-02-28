import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { R2BucketController } from './r2-bucket.controller';
import { R2BucketService } from './r2-bucket.service';

@Module({
  imports: [ConfigModule],
  controllers: [R2BucketController],
  providers: [R2BucketService],
  exports: [R2BucketService],
})
export class R2BucketModule {}
