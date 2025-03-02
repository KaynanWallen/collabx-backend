import { PartialType } from '@nestjs/mapped-types';
import { CreateImageDTO } from './create-image.dto';

export class UpdateImageDTO extends PartialType(CreateImageDTO) {}
