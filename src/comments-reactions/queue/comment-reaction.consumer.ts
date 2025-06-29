import { Process, Processor } from "@nestjs/bull";
import { Job, tryCatch } from "bullmq";
import { CommentsReactionsService } from "../comments-reactions.service";

@Processor('commentsReactionsQueue')
export class CommentReactionConsumer {
  constructor(
    private readonly commentsReactionsService: CommentsReactionsService,
  ) { }

  @Process('reaction-job')
  async reaction(job: Job<any>) {
    console.log(`🔄 Processando toggle para user: ${job.data.userToken} com o comentário: ${job.data.toggleCommentReaction.commentId}`);
    try {
      const result = await this.commentsReactionsService.toggle(job.data.toggleCommentReaction, job.data.userToken);
      console.log(`✅ Resultado do processamento: (Comentário - ${result.commentId}, Reação - ${result.reactionType}, Autor - ${result.authorId})`);
    } catch (error) {
      console.error('❌ Erro ao processar o trabalho:', error);
      throw error; // Permite que o BullMQ registre a falha e tente novamente
    }
  }
}