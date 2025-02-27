import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from 'src/database/prisma.service';
import { FindAccountDto } from 'src/accounts/dto/find-account.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CommentsReactionsRepository } from '../comments-reactions.repository';
import { CreateCommentsReactionDTO } from 'src/comments-reactions/dto/create-comments-reaction.dto';
import { UpdateCommentsReactionDTO } from 'src/comments-reactions/dto/update-comments-reaction.dto';
import { CommentsReactionDTO } from 'src/comments-reactions/dto/comments-reaction.dto';
import { CommentsService } from 'src/comments/comments.service';

@Injectable()
export class PrismaCommentsReactionsRepository implements CommentsReactionsRepository {
  constructor(
    private prisma: PrismaService,
    private commentsService: CommentsService,
    // private comment
  ) { }
  
  async create(create_commentsReaction: CreateCommentsReactionDTO, userTokenId: number | null): Promise<any> {
    try {
      if(!userTokenId || userTokenId !== create_commentsReaction.authorId){
        throw new BadRequestException('Você não tem permissão para criar este projeto.');
      }
      
      const commentReactionRecord = await this.prisma.commentReaction.findFirst({
        where: { commentId: create_commentsReaction.commentId, authorId: create_commentsReaction.authorId },
      })

      if(commentReactionRecord){
        throw new BadRequestException('Já existe uma reação de comentário para este comentário e autor.');
      }

      const createCommentReactionRecord = await this.prisma.commentReaction.create({
        data: {
          commentId: create_commentsReaction.commentId,
          authorId: create_commentsReaction.authorId,
          reactionType: create_commentsReaction.reactionType,
        }
      })

      await this.commentsService.addReaction(create_commentsReaction.commentId, createCommentReactionRecord.reactionType);
      
      return createCommentReactionRecord
      
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Erro inesperado ao atualizar o perfil.');
    }
  }

  async update(commentsReactionId: number, update_commentsReaction: UpdateCommentsReactionDTO, userTokenId: number | null): Promise<any> {
    try {
      const commentsReactionExists = await this.prisma.commentReaction.findUnique({
        where: { id: commentsReactionId },
      });
  
      if (!commentsReactionExists) {
        throw new NotFoundException('A reação de comentário informada não foi encontrado.');
      }
    
      if(!userTokenId || userTokenId !== commentsReactionExists.authorId){
        throw new BadRequestException('Você não tem permissão para editar esta reação de comentário.');
      }

      return await this.prisma.commentReaction.update({
        where: { id: commentsReactionId },
        data: {
          commentId: update_commentsReaction.commentId ?? commentsReactionExists.commentId,
          authorId: update_commentsReaction.authorId ?? commentsReactionExists.authorId,
          reactionType: update_commentsReaction.reactionType ?? commentsReactionExists.reactionType,
        },
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Erro inesperado ao atualizar o projeto.');
    }
  }

  async findOne(id: number): Promise<CommentsReactionDTO | null> {
    try {
      const commentsReactionRecord = await this.prisma.commentReaction.findUnique({
        where: { id: id },
      })
      

      if(!commentsReactionRecord){
        throw new NotFoundException('A reação de comentário informada não foi encontrada.');
      }

      return commentsReactionRecord
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

  async findAllByProfileId(profileId: number): Promise<CommentsReactionDTO[] | null> {
    try {
      const commentsReactionRecord = await this.prisma.commentReaction.findMany({
        where: { authorId: profileId },
      })

      return commentsReactionRecord || []
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

  async findAll(): Promise<CommentsReactionDTO[] | null> {
    try {
      const commentsReactionRecord = await this.prisma.commentReaction.findMany()
      return commentsReactionRecord || []
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

  async remove(id: number, userTokenId: number | null): Promise<CommentsReactionDTO | null> {
    try {
      const commentsReactionRecord = await this.prisma.commentReaction.findUnique({
        where: { id: id },
      })
      

      if(!commentsReactionRecord){
        throw new NotFoundException('O perfil informado não foi encontrado.');
      }

      if(!userTokenId || userTokenId !== commentsReactionRecord.authorId){
        throw new BadRequestException('Você não tem permissão para remover este projeto.');
      }

      const removeCommentReactionRecord = await this.prisma.commentReaction.delete({
        where: { id: id },
      });

      await this.commentsService.removeReaction(removeCommentReactionRecord.commentId, removeCommentReactionRecord.reactionType);

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