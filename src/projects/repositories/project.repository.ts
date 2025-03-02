import { CreateProjectDTO } from "../dto/create-project.dto";
import { FindProjectsReactionsByProjectDTO } from "../dto/find-project-reactions-by-project.dto";
import { ProjectDTO } from "../dto/project.dto";
import { UpdateProjectDTO } from "../dto/update-project.dto";

export abstract class ProjectsRepository {
  abstract create(create_project: CreateProjectDTO, userTokenId: number | null): Promise<any>;
  abstract addImageProject(file: Express.Multer.File, id: number, userTokenId: number | null): Promise<any>
  abstract update(projectId: number, update_project: UpdateProjectDTO, userTokenId: number | null): Promise<any>;
  abstract findOne(projectId: number): Promise<ProjectDTO | null>;
  abstract findAllByProfileId(profileId: number): Promise<ProjectDTO[] | null>;
  abstract findAllProjectsReactionsByProjectId(projectId: number): Promise<FindProjectsReactionsByProjectDTO[] | null>;
  abstract findAll(): Promise<ProjectDTO[] | null>;
  abstract addReaction(projectId: number, reactionType: string): Promise<any>;
  abstract removeReaction(projectId: number, reactionType: string): Promise<any>;
  abstract remove(id: number, userTokenId: number | null): Promise<ProjectDTO | null>;
}