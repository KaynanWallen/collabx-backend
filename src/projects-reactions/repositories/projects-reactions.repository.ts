import { ProjectsReactionDTO } from "../dto/comments-reaction.dto";
import { CreateProjectsReactionDTO } from "../dto/create-comments-reaction.dto";
import { UpdateProjectsReactionDTO } from "../dto/update-comments-reaction.dto";

export abstract class ProjectsReactionsRepository {
  abstract create(create_projectsReaction: CreateProjectsReactionDTO, userTokenId: number | null): Promise<any>;
  abstract update(projectsReactionId: number, update_projectsReaction: UpdateProjectsReactionDTO, userTokenId: number | null): Promise<any>;
  abstract findOne(projectsReactionId: number): Promise<ProjectsReactionDTO | null>;
  abstract findAllByProfileId(profileId: number): Promise<ProjectsReactionDTO[] | null>;
  abstract findAll(): Promise<ProjectsReactionDTO[] | null>;
  abstract remove(id: number, userTokenId: number | null): Promise<ProjectsReactionDTO | null>;
}