import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from 'src/database/prisma.service';
import { FindAccountDto } from 'src/accounts/dto/find-account.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateProjectDTO } from 'src/projects/dto/create-project.dto';
import { ProjectsRepository } from '../project.repository';
import { UpdateProjectDTO } from 'src/projects/dto/update-project.dto';
import { ProjectDTO } from 'src/projects/dto/project.dto';

@Injectable()
export class PrismaProjectsRepository implements ProjectsRepository {
  constructor(private prisma: PrismaService) { }

  async create(create_project: CreateProjectDTO, userTokenId: number | null): Promise<any> {
    try {
      if(!userTokenId || userTokenId !== create_project.authorId){
        throw new BadRequestException('Você não tem permissão para criar este projeto.');
      }

      return this.prisma.project.create({
        data: {
          authorId: create_project.authorId,
          content: create_project.content,
          techs: create_project.techs,
          figmaLink: create_project.linkedinLink,
          githubLink: create_project.githubLink,
          linkedinLink: create_project.linkedinLink
        }
      })
      
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Erro inesperado ao atualizar o perfil.');
    }
  }

  async update(projectId: number, update_project: UpdateProjectDTO, userTokenId: number | null): Promise<any> {
    try {
      const projectExists = await this.prisma.project.findUnique({
        where: { id: projectId },
      });
  
      if (!projectExists) {
        throw new NotFoundException('O projeto informado não foi encontrado.');
      }
    
      if(!userTokenId || userTokenId !== projectExists.authorId){
        throw new BadRequestException('Você não tem permissão para editar este projeto.');
      }

      return await this.prisma.project.update({
        where: { id: projectId },
        data: {
          authorId: update_project.authorId ?? projectExists.authorId,
          content: update_project.content ?? projectExists.content,
          techs: update_project.techs ?? projectExists.techs,
          figmaLink: update_project.linkedinLink ?? projectExists.linkedinLink,
          githubLink: update_project.githubLink ?? projectExists.githubLink,
          linkedinLink: update_project.linkedinLink ?? projectExists.linkedinLink
        },
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Erro inesperado ao atualizar o projeto.');
    }
  }

  async findOne(id: number): Promise<ProjectDTO | null> {
    try {
      const projectRecord = await this.prisma.project.findUnique({
        where: { id: id },
      })
      

      if(!projectRecord){
        throw new NotFoundException('O projeto informado não foi encontrado.');
      }

      return projectRecord
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

  async findAllByProfileId(profileId: number): Promise<ProjectDTO[] | null> {
    try {
      const projectRecord = await this.prisma.project.findMany({
        where: { authorId: profileId },
      })

      return projectRecord || []
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


  async findAll(): Promise<ProjectDTO[] | null> {
    try {
      const projectRecord = await this.prisma.project.findMany()
      return projectRecord || []
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

  async remove(id: number, userTokenId: number | null): Promise<ProjectDTO | null> {
    try {
      const projectRecord = await this.prisma.project.findUnique({
        where: { id: id },
      })
      

      if(!projectRecord){
        throw new NotFoundException('O perfil informado não foi encontrado.');
      }

      if(!userTokenId || userTokenId !== projectRecord.authorId){
        throw new BadRequestException('Você não tem permissão para remover este projeto.');
      }

      return await this.prisma.project.delete({
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