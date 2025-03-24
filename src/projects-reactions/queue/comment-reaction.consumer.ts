import { Process, Processor } from "@nestjs/bull";
import { Job, tryCatch } from "bullmq";
import { ProjectsReactionsService } from "../projects-reactions.service";

@Processor('projectsReactionsQueue')
export class ProjectReactionConsumer {
  constructor(
    private readonly projectsReactionsService: ProjectsReactionsService,
  ) { }

  @Process('reaction-project-job')
  async reaction(job: Job<any>) {
    console.log(`🔄 Processando toggle para user: ${job.data.userToken} com o projeto: ${job.data.toggleProjectReaction.projectId}`);
    try {
      const result = await this.projectsReactionsService.toggle(job.data.toggleProjectReaction, job.data.userToken);
      console.log(`✅ Resultado do processamento: (Projeto - ${result.projectId}, Reação - ${result.reactionType}, Autor - ${result.authorId})`);
    } catch (error) {
      console.error('❌ Erro ao processar o trabalho:', error);
      throw error; // Permite que o BullMQ registre a falha e tente novamente
    }
  }
}