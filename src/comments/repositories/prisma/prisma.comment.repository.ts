import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from 'src/database/prisma.service';
import { FindAccountDto } from 'src/accounts/dto/find-account.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CommentsRepository } from '../comment.repository';
import { CommentDTO } from 'src/comments/dto/comment.dto';
import { CreateCommentDTO } from 'src/comments/dto/create-comment.dto';
import { UpdateCommentDTO } from 'src/comments/dto/update-comment.dto';
import { CommentsReactionDTO } from 'src/comments-reactions/dto/comments-reaction.dto';
import { FindCommentReactionsByCommentDTO } from 'src/comments/dto/find-comment-reactions-by-comment.dto';

@Injectable()
export class PrismaCommentsRepository implements CommentsRepository {
  constructor(private prisma: PrismaService) { }

  async create(create_comment: CreateCommentDTO, userTokenId: number | null): Promise<any> {
    try {
      if(!userTokenId || userTokenId !== create_comment.authorId){
        throw new BadRequestException('Você não tem permissão para criar este comentário.');
      }

      const createCommentRecord = await this.prisma.comment.create({
        data: {
          projectId: create_comment.projectId,
          authorId: create_comment.authorId,
          parentId: create_comment.parentId,
          content: create_comment.content
        }
      })

      if(createCommentRecord.parentId){
        await this.prisma.comment.update({
          where: { id: createCommentRecord.parentId },
          data: {
            commentCount: {
              increment: 1,
            },
          }
        })
      }

      return createCommentRecord
      
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
        where: { projectId: projectId, parentId: null},
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

  async findAllParentByCommentId(commentId: number): Promise<CommentDTO[] | null> {
    try {
      const commentRecord = await this.prisma.comment.findMany({
        where: { parentId: commentId},
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

  async findAllCommentsReactionsByCommentId(commentId: number): Promise<FindCommentReactionsByCommentDTO[] | null> {
    try {
      return await this.prisma.commentReaction.findMany({
        where: { commentId: commentId },
        include: {
          author: true,
        },
      })
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
      const commentRecord = await this.prisma.comment.findMany({
        where: { parentId: null}
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

  async addReaction(commentId: number, reactionType: string): Promise<any> {
    try {
      const commentRecord = await this.prisma.comment.findUnique({
        where: { id: commentId },
      })
      

      if(!commentRecord){
        throw new NotFoundException('O comentário informado não foi encontrado.');
      }

      if(reactionType == 'like'){
        return await this.prisma.comment.update({
          where: { id: commentId },
          data: {
            likeCount: commentRecord.likeCount + 1,
          },
        })
      }

      if(reactionType == 'deslike'){
        return await this.prisma.comment.update({
          where: { id: commentId },
          data: {
            dislikeCount: commentRecord.likeCount + 1,
          },
        })
      }
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

  async removeReaction(commentId: number, reactionType: string): Promise<any> {
    try {
      const commentRecord = await this.prisma.comment.findUnique({
        where: { id: commentId },
      })
      

      if(!commentRecord){
        throw new NotFoundException('O comentário informado não foi encontrado.');
      }

      if(reactionType == 'like'){
        return await this.prisma.comment.update({
          where: { id: commentId },
          data: {
            likeCount: commentRecord.likeCount - 1,
          },
        })
      }

      if(reactionType == 'deslike'){
        return await this.prisma.comment.update({
          where: { id: commentId },
          data: {
            dislikeCount: commentRecord.likeCount - 1,
          },
        })
      }
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

      const removeCommentRecord = await this.prisma.comment.delete({
        where: { id: id },
      });

      if(removeCommentRecord.parentId){
        await this.prisma.comment.update({
          where: { id: removeCommentRecord.parentId },
          data: {
            commentCount: {
              decrement: 1,
            },
          }
        })
      }

      return removeCommentRecord
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