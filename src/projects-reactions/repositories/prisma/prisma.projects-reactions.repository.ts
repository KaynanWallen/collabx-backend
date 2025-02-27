import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ProjectsReactionsRepository } from '../projects-reactions.repository';
import { CreateProjectsReactionDTO } from 'src/projects-reactions/dto/create-comments-reaction.dto';
import { UpdateProjectsReactionDTO } from 'src/projects-reactions/dto/update-comments-reaction.dto';
import { ProjectsReactionDTO } from 'src/projects-reactions/dto/comments-reaction.dto';
import { ProjectsService } from 'src/projects/projects.service';

@Injectable()
export class PrismaProjectsReactionsRepository implements ProjectsReactionsRepository {
  constructor(
    private prisma: PrismaService,
    private projectsService: ProjectsService,
    // private comment
  ) { }
  
  async create(create_projectsReaction: CreateProjectsReactionDTO, userTokenId: number | null): Promise<any> {
    try {
      if(!userTokenId || userTokenId !== create_projectsReaction.authorId){
        throw new BadRequestException('Você não tem permissão para criar este projeto.');
      }
      
      const commentReactionRecord = await this.prisma.projectReaction.findFirst({
        where: { projectId: create_projectsReaction.projectId, authorId: create_projectsReaction.authorId },
      })

      if(commentReactionRecord){
        throw new BadRequestException('Já existe uma reação de comentário para este comentário e autor.');
      }

      const createCommentReactionRecord = await this.prisma.projectReaction.create({
        data: {
          projectId: create_projectsReaction.projectId,
          authorId: create_projectsReaction.authorId,
          reactionType: create_projectsReaction.reactionType,
        }
      })

      await this.projectsService.addReaction(create_projectsReaction.projectId, createCommentReactionRecord.reactionType);
      
      return createCommentReactionRecord
      
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Erro inesperado ao atualizar o perfil.');
    }
  }

  async update(projectsReactionId: number, update_projectsReaction: UpdateProjectsReactionDTO, userTokenId: number | null): Promise<any> {
    try {
      const projectsReactionExists = await this.prisma.projectReaction.findUnique({
        where: { id: projectsReactionId },
      });
  
      if (!projectsReactionExists) {
        throw new NotFoundException('A reação de comentário informada não foi encontrado.');
      }
    
      if(!userTokenId || userTokenId !== projectsReactionExists.authorId){
        throw new BadRequestException('Você não tem permissão para editar esta reação de comentário.');
      }

      return await this.prisma.projectReaction.update({
        where: { id: projectsReactionId },
        data: {
          projectId: update_projectsReaction.projectId ?? projectsReactionExists.projectId,
          authorId: update_projectsReaction.authorId ?? projectsReactionExists.authorId,
          reactionType: update_projectsReaction.reactionType ?? projectsReactionExists.reactionType,
        },
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Erro inesperado ao atualizar o projeto.');
    }
  }

  async findOne(id: number): Promise<ProjectsReactionDTO | null> {
    try {
      const projectsReactionRecord = await this.prisma.projectReaction.findUnique({
        where: { id: id },
      })
      

      if(!projectsReactionRecord){
        throw new NotFoundException('A reação de comentário informada não foi encontrada.');
      }

      return projectsReactionRecord
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }

      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException('O accountId informado não existe.');
        }
      }
      throw new InternalServerErrorException('Erro inesperado ao buscar o reação de comentário.');
    }
  }

  async findAllByProfileId(profileId: number): Promise<ProjectsReactionDTO[] | null> {
    try {
      const projectsReactionRecord = await this.prisma.projectReaction.findMany({
        where: { authorId: profileId },
      })

      return projectsReactionRecord || []
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

  async findAll(): Promise<ProjectsReactionDTO[] | null> {
    try {
      const projectsReactionRecord = await this.prisma.projectReaction.findMany()
      return projectsReactionRecord || []
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

  async remove(id: number, userTokenId: number | null): Promise<ProjectsReactionDTO | null> {
    try {
      const projectsReactionRecord = await this.prisma.commentReaction.findUnique({
        where: { id: id },
      })
      

      if(!projectsReactionRecord){
        throw new NotFoundException('O perfil informado não foi encontrado.');
      }

      if(!userTokenId || userTokenId !== projectsReactionRecord.authorId){
        throw new BadRequestException('Você não tem permissão para remover este projeto.');
      }

      const removeCommentReactionRecord = await this.prisma.projectReaction.delete({
        where: { id: id },
      });

      await this.projectsService.removeReaction(removeCommentReactionRecord.projectId, removeCommentReactionRecord.reactionType);

      return removeCommentReactionRecord
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