import { Controller, Post, Get, Delete, Param, UploadedFile, UseInterceptors, Res, StreamableFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { R2BucketService } from './r2-bucket.service';

@Controller('bucket')
export class R2BucketController {
  constructor(private readonly bucketService: R2BucketService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.bucketService.uploadFile(file);
  }

  @Get('list')
  async listFiles() {
    return this.bucketService.listFiles();
  }

  @Get(':key')
  async getFile(@Param('key') key: string) {
    return this.bucketService.getFile(key);
  }

  @Delete(':key')
  async deleteFile(@Param('key') key: string) {
    return this.bucketService.deleteFile(key);
  }
}
