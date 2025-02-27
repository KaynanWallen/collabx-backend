import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from 'src/database/prisma.service';
import { FindAccountDto } from 'src/accounts/dto/find-account.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CommentsRepository } from '../comment.repository';
import { CommentDTO } from 'src/comments/dto/comment.dto';
import { CreateCommentDTO } from 'src/comments/dto/create-comment.dto';
import { UpdateCommentDTO } from 'src/comments/dto/update-comment.dto';

@Injectable()
export class PrismaCommentsRepository implements CommentsRepository {
  constructor(private prisma: PrismaService) { }

  async create(create_comment: CreateCommentDTO, userTokenId: number | null): Promise<any> {
    try {
      if(!userTokenId || userTokenId !== create_comment.authorId){
        throw new BadRequestException('Você não tem permissão para criar este comentário.');
      }

      return this.prisma.comment.create({
        data: {
          projectId: create_comment.projectId,
          authorId: create_comment.authorId,
          parentId: create_comment.parentId,
          content: create_comment.content
        }
      })
      
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Erro inesperado ao atualizar o comentário.');
    }
  }

  async update(commentId: number, update_comment: UpdateCommentDTO, userTokenId: number | null): Promise<any> {
    try {
      const commentExists = await this.prisma.comment.findUnique({
        where: { id: commentId },
      });
  
      if (!commentExists) {
        throw new NotFoundException('O comentário informado não foi encontrado.');
      }

      if(!userTokenId || userTokenId !== commentExists.authorId){
        throw new BadRequestException('Você não tem editar para criar este comentário.');
      }
  
      return await this.prisma.comment.update({
        where: { id: commentId },
        data: {
          content: update_comment.content ?? commentExists.content,
        },
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Erro inesperado ao atualizar o projeto.');
    }
  }

  async findOne(id: number): Promise<CommentDTO | null> {
    try {
      const commentRecord = await this.prisma.comment.findUnique({
        where: { id: id },
      })
      

      if(!commentRecord){
        throw new NotFoundException('O projeto informado não foi encontrado.');
      }

      return commentRecord
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

  async findAllByProjectId(projectId: number): Promise<CommentDTO[] | null> {
    try {
      const commentRecord = await this.prisma.comment.findMany({
        where: { projectId: projectId },
      })

      return commentRecord || []
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

  async findAll(): Promise<CommentDTO[] | null> {
    try {
      const commentRecord = await this.prisma.comment.findMany()
      return commentRecord || []
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

  async remove(id: number, userTokenId: number | null): Promise<CommentDTO | null> {
    try {
      const commentRecord = await this.prisma.comment.findUnique({
        where: { id: id },
      })
      

      if(!commentRecord){
        throw new NotFoundException('O perfil informado não foi encontrado.');
      }

      if(!userTokenId || userTokenId !== commentRecord.authorId){
        throw new BadRequestException('Você não tem permissão para remover este comentário.');
      }

      return await this.prisma.comment.delete({
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