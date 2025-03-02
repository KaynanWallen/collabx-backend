export class ImageDTO {
  id: number;
  cloudflareId: string;
  authorId: number;
  projectId: number;
  name: string;
  type_image: string;
  primary_image: boolean;
  createdAt: Date;
  lastModified: Date;
}
