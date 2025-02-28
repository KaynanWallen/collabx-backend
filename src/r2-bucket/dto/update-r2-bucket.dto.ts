import { PartialType } from '@nestjs/mapped-types';
import { CreateR2BucketDto } from './create-r2-bucket.dto';

export class UpdateR2BucketDto extends PartialType(CreateR2BucketDto) {}
