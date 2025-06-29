import { ProjectsReactionDTO } from "../dto/projects-reaction.dto";
import { CreateProjectsReactionDTO } from "../dto/create-projects-reaction.dto";
import { UpdateProjectsReactionDTO } from "../dto/update-projects-reaction.dto";

export abstract class ProjectsReactionsRepository {
  abstract create(create_projectsReaction: CreateProjectsReactionDTO, userTokenId: number | null): Promise<any>;
  abstract toggle(create_commentsReaction: CreateProjectsReactionDTO, userTokenId: number | null): Promise<any>;
  abstract update(projectsReactionId: number, update_projectsReaction: UpdateProjectsReactionDTO, userTokenId: number | null): Promise<any>;
  abstract findOne(projectsReactionId: number): Promise<ProjectsReactionDTO | null>;
  abstract findAllByProfileId(profileId: number): Promise<ProjectsReactionDTO[] | null>;
  abstract findAll(): Promise<ProjectsReactionDTO[] | null>;
  abstract remove(id: number, userTokenId: number | null): Promise<ProjectsReactionDTO | null>;
}