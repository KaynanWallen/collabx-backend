import { CreateImageDTO } from "../dto/create-image.dto";
import { ImageDTO } from "../dto/image.dto";
import { UpdateImageDTO } from "../dto/update-image.dto";

export abstract class ImagesRepository {
  abstract create(create_image: CreateImageDTO, userTokenId: number | null): Promise<any>;
  abstract update(imageId: number, update_image: UpdateImageDTO, userTokenId: number | null): Promise<any>;
  abstract findOne(imageId: number): Promise<ImageDTO | null>;
  abstract findAll(): Promise<ImageDTO[] | null>;
  abstract remove(id: number, userTokenId: number | null): Promise<ImageDTO | null>;
  
}