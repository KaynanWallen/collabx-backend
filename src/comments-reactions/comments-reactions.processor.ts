import { Processor } from "@nestjs/bull";
import { CommentsReactionsService } from "./comments-reactions.service";
import { CreateCommentsReactionDTO } from "./dto/create-comments-reaction.dto";
import { Job } from "bullmq";

@Processor('commentsReactionsQueue')
export class CommentsReactionsProcessor {
  constructor(
    private readonly commentsReactionsService: CommentsReactionsService,
  ){}

  async handleReaction(job: Job) {
    console.log(`🔄 Processando toggle para user: ${job.data.userToken}`);
    try {
      const result = await this.commentsReactionsService.toggle(job.data.toggleCommentReaction, job.data.userToken);
      console.log('Resultado do processamento:', result);
    } catch (error) {
      console.error('Erro ao processar o trabalho:', error);
    }
  }
}