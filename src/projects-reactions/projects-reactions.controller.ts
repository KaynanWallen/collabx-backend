import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpCode } from '@nestjs/common';
import { ProjectsReactionsService } from './projects-reactions.service';
import { UpdateProjectsReactionDTO } from './dto/update-projects-reaction.dto';
import { CreateProjectsReactionDTO } from './dto/create-projects-reaction.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bullmq';

@Controller('projects-reactions')
export class ProjectsReactionsController {
  constructor(
    private readonly projectsReactionsService: ProjectsReactionsService,
    @InjectQueue('projectsReactionsQueue')
    private readonly projectsReactionsQueue: Queue,
  ) {}

  @Post('/add')
  create(@Body() createProjectsReactionDTO: CreateProjectsReactionDTO, @Req() request: Request) {
    const userToken: {profileId: number | null} = request['user'];
    return this.projectsReactionsService.create(createProjectsReactionDTO, userToken.profileId);
  }

  @Post('/toggle')
  @HttpCode(204)
  async toggle(@Body() toggleProjectReaction: CreateProjectsReactionDTO, @Req() request: Request) {
    const userToken: {profileId: number | null} = request['user'];
    await this.projectsReactionsQueue.add('reaction-project-job', { toggleProjectReaction, userToken: userToken.profileId });
  }

  @Get()
  findAll() {
    return this.projectsReactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsReactionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectsReactionDTO: UpdateProjectsReactionDTO, @Req() request: Request) {
    const userToken: {profileId: number | null} = request['user'];
    return this.projectsReactionsService.update(+id, updateProjectsReactionDTO, userToken.profileId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: Request) {
    const userToken: {profileId: number | null} = request['user'];
    return this.projectsReactionsService.remove(+id, userToken.profileId);
  }
}
