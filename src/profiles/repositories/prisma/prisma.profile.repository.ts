import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from 'src/database/prisma.service';
import { FindAccountDto } from 'src/accounts/dto/find-account.dto';
import { CreateProfileDto } from 'src/profiles/dto/create-profile.dto';
import { ProfileDTO } from 'src/profiles/dto/profile.dto';
import { ProfilesRepository } from '../profile.repository';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UpdateProfileDto } from 'src/profiles/dto/update-profile.dto';

@Injectable()
export class PrismaProfilesRepository implements ProfilesRepository {
  constructor(private prisma: PrismaService) { }

  async create(create_profile: CreateProfileDto): Promise<any> {
    try {
      const existOtherProfileLinkedToAccount = await this.prisma.profile.findFirst({
        where: { accountId: create_profile.accountId },
      });


      if (existOtherProfileLinkedToAccount) {
        throw new BadRequestException('Já existe um perfil vinculado a este accountId.');
      }
  
  
      return this.prisma.profile.create({
        data: {
          accountId: create_profile.accountId,
          name: create_profile.name,
          title: create_profile.title,
          githubLink: create_profile.githubLink,
          linkedinLink: create_profile.linkedinLink,
          twitterLink: create_profile.twitterLink,
          about: create_profile.about,
          techs: create_profile.techs,
          followersCount: 0,
          followingCount: 0
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
      throw new InternalServerErrorException('Erro inesperado ao atualizar o perfil.');
    }
  }

  async update(profileId: number, update_profile: UpdateProfileDto): Promise<any> {
    try {
      const profileExists = await this.prisma.profile.findUnique({
        where: { id: profileId },
      });
  
      if (!profileExists) {
        throw new NotFoundException('O perfil informado não foi encontrado.');
      }
  
      return await this.prisma.profile.update({
        where: { id: profileId },
        data: {
          name: update_profile.name ?? profileExists.name,
          title: update_profile.title ?? profileExists.title,
          githubLink: update_profile.githubLink ?? profileExists.githubLink,
          linkedinLink: update_profile.linkedinLink ?? profileExists.linkedinLink,
          twitterLink: update_profile.twitterLink ?? profileExists.twitterLink,
          about: update_profile.about ?? profileExists.about,
          techs: update_profile.techs ?? profileExists.techs,
        },
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException('O accountId informado não existe.');
        }
      }
      throw new InternalServerErrorException('Erro inesperado ao atualizar o perfil.');
    }
  }

  async findOne(id: number): Promise<ProfileDTO | null> {
    try {
      const profileRecord = await this.prisma.profile.findUnique({
        where: { id: id },
      })
      

      if(!profileRecord){
        throw new NotFoundException('O perfil informado não foi encontrado.');
      }

      return profileRecord
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }

      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException('O accountId informado não existe.');
        }
      }
      throw new InternalServerErrorException('Erro inesperado ao buscar o perfil.');
    }
  }

  async findAll(): Promise<ProfileDTO[] | null> {
    try {
      const profileRecord = await this.prisma.profile.findMany()
      return profileRecord || []
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }

      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException('O accountId informado não existe.');
        }
      }
      throw new InternalServerErrorException('Erro inesperado ao buscar o perfil.');
    }
  }

  async remove(id: number): Promise<ProfileDTO | null> {
    try {
      const profileRecord = await this.prisma.profile.findUnique({
        where: { id: id },
      })
      

      if(!profileRecord){
        throw new NotFoundException('O perfil informado não foi encontrado.');
      }

      return await this.prisma.profile.delete({
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
      throw new InternalServerErrorException('Erro inesperado ao buscar o perfil.');
    }
  }
}