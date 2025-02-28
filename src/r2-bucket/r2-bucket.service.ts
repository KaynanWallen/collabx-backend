import { Injectable, NotFoundException } from '@nestjs/common';
import { S3Client, PutObjectCommand, ListObjectsV2Command, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';


@Injectable()
export class R2BucketService {
  private s3Client: S3Client;
  private bucketName: string ;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('R2_REGION') || "",
      endpoint: this.configService.get<string>('R2_ENDPOINT') || "",
      credentials: {
        accessKeyId: this.configService.get<string>('R2_ACCESS_KEY') || "",
        secretAccessKey: this.configService.get<string>('R2_SECRET_KEY') || "",
      },
    });

    this.bucketName = this.configService.get<string>('R2_BUCKET_NAME') || ""
  }

  async uploadFile(file: Express.Multer.File) {
    const key = `images/${Date.now()}-${file.originalname}`;

    const uploadParams = {
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await this.s3Client.send(new PutObjectCommand(uploadParams));

    return { url: `${this.configService.get('R2_ENDPOINT')}/${this.bucketName}/${key}`, key };
  }

  async listFiles() {
    const command = new ListObjectsV2Command({ Bucket: this.bucketName });
    const { Contents } = await this.s3Client.send(command);
    return Contents?.map(file => ({
      key: file.Key,
      url: `${this.configService.get('R2_ENDPOINT')}/${this.bucketName}/${file.Key}`,
    })) || [];
  }

  async getFile(key: string) {
    try {
      const signedUrl = await getSignedUrl(
        this.s3Client,
        new GetObjectCommand({
            Bucket: 'collabx',
            Key: `images/${key}`,
        }),
        { expiresIn: 600 },  
      )
      return { url: signedUrl }; // Retorna a URL assinada em vez do stream
    } catch (error) {
      throw new NotFoundException('File not found');
    }
  }

  async deleteFile(key: string) {
    const command = new DeleteObjectCommand({ Bucket: this.bucketName, Key: key });
    await this.s3Client.send(command);
    return { message: 'File deleted successfully' };
  }
}
