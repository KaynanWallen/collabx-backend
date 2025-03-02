import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDTO } from './dto/create-image.dto';
import { UpdateImageDTO } from './dto/update-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File ,@Body() createImageDto: CreateImageDTO, @Req() request: Request) {
    const userToken: {imageId: number | null, id: number} = request['user'];
    return this.imagesService.create({
      ...createImageDto,
      image_file: file,
    }, userToken.id);
  }

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDTO, @Req() request: Request) {
    const userToken: {imageId: number | null} = request['user'];
    return this.imagesService.update(+id, updateImageDto, userToken.imageId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: Request) {
    const userToken: {imageId: number | null} = request['user'];
    return this.imagesService.remove(+id, userToken.imageId);
  }
}
