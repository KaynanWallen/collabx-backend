import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateImageDTO } from 'src/images/dto/create-image.dto';
import { ImageDTO } from 'src/images/dto/image.dto';
import { ImagesRepository } from '../image.repository';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UpdateImageDTO } from 'src/images/dto/update-image.dto';
import { R2BucketService } from 'src/r2-bucket/r2-bucket.service';

@Injectable()
export class PrismaImagesRepository implements ImagesRepository {
  constructor(
    private prisma: PrismaService,
    private r2Bucket: R2BucketService
  ) { }

  async create(create_image: CreateImageDTO, userTokenId: number | null): Promise<any> {
    try {
      if(!userTokenId || userTokenId !== create_image.authorId){
        throw new BadRequestException('Você não tem permissão para adicionar essa imagem.');
      }

      const r2BucketToken = await this.r2Bucket.uploadFile(create_image.image_file)

      return this.prisma.imagesProject.create({
        data: {
          authorId: create_image.authorId,
          cloudflareId: r2BucketToken.key,
          name: create_image.name,
          type_image: create_image.type_image,
          primary_image: create_image.primary_image,
          projectId: create_image.projectId
        }
      })
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException('O accountId informado não existe.');
        }
      }
      throw new InternalServerErrorException('Erro inesperado ao atualizar o imagem.');
    }
  }

  async update(imageId: number, update_image: UpdateImageDTO, userTokenId: number | null): Promise<any> {
    try {
      if(!userTokenId || userTokenId !== update_image.authorId){
        throw new BadRequestException('Você não tem permissão para editar essa imagem.');
      }


      const imageExists = await this.prisma.imagesProject.findUnique({
        where: { id: imageId },
      });


      if (!imageExists) {
        throw new NotFoundException('O imagem informado não foi encontrado.');
      }

      if(!userTokenId || userTokenId !== imageExists.id){
        throw new BadRequestException('Você não tem permissão para atualizar este imagem.');
      }
      
      return await this.prisma.imagesProject.update({
        where: { id: imageId },
        data: {
          name: update_image.name ?? imageExists.name,
          type_image: update_image.type_image ?? imageExists.type_image,
          primary_image: update_image.primary_image ?? imageExists.primary_image
        },
      });
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException('O accountId informado não existe.');
        }
      }
      throw new InternalServerErrorException('Erro inesperado ao atualizar o imagem.');
    }
  }

  async findOne(id: number): Promise<ImageDTO | null> {
    try {
      const imageRecord = await this.prisma.imagesProject.findUnique({
        where: { id: id },
      })
      

      if(!imageRecord){
        throw new NotFoundException('O imagem informado não foi encontrado.');
      }

      return imageRecord
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }

      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException('O accountId informado não existe.');
        }
      }
      throw new InternalServerErrorException('Erro inesperado ao buscar o imagem.');
    }
  }

  async findAll(): Promise<ImageDTO[] | null> {
    try {
      const imageRecord = await this.prisma.imagesProject.findMany()
      return imageRecord || []
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }

      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException('O accountId informado não existe.');
        }
      }
      throw new InternalServerErrorException('Erro inesperado ao buscar o imagem.');
    }
  }

  async remove(id: number, userTokenId: number | null): Promise<ImageDTO | null> {
    try {

      const imageRecord = await this.prisma.imagesProject.findUnique({
        where: { id: id },
      })
      

      if(!imageRecord){
        throw new NotFoundException('A imagem informada não foi encontrada.');
      }

      if(!userTokenId || userTokenId !== imageRecord.authorId){
        throw new BadRequestException('Você não tem permissão para remover essa imagem.');
      }

      if(!userTokenId || userTokenId !== imageRecord.id){
        throw new BadRequestException('Você não tem permissão para criar este imagem.');
      }
      
      return await this.prisma.imagesProject.delete({
        where: { id: id },
      });
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }

      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException('O accountId informado não existe.');
        }
      }
      throw new InternalServerErrorException('Erro inesperado ao buscar o imagem.');
    }
  }
}