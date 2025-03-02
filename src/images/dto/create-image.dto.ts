import internal from "stream";

export class CreateImageDTO {
  authorId: number;
  projectId: number;
  name: string;
  type_image: string;
  primary_image: boolean;
  image_file: Express.Multer.File;
}
