import { Injectable } from '@nestjs/common';
import { CreateImageDTO } from './dto/create-image.dto';
import { ImagesRepository } from './repositories/image.repository';
import { UpdateImageDTO } from './dto/update-image.dto';

@Injectable()
export class ImagesService {
  constructor(private ImagesRepository: ImagesRepository) {}

  create(createImageDto: CreateImageDTO, userTokenId: number | null) {
    return this.ImagesRepository.create(createImageDto, userTokenId);
  }

  findAll() {
    return this.ImagesRepository.findAll();
  }

  findOne(id: number) {
    return this.ImagesRepository.findOne(id);
  }

  update(id: number, updateImageDto: UpdateImageDTO, userTokenId: number | null) {
    return this.ImagesRepository.update(id, updateImageDto, userTokenId);
  }

  remove(id: number, userTokenId: number | null) {
    return this.ImagesRepository.remove(id, userTokenId);
  }
}
