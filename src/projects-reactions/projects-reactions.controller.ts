import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ProjectsReactionsService } from './projects-reactions.service';
import { UpdateProjectsReactionDTO } from './dto/update-comments-reaction.dto';
import { CreateProjectsReactionDTO } from './dto/create-comments-reaction.dto';

@Controller('projects-reactions')
export class ProjectsReactionsController {
  constructor(private readonly projectsReactionsService: ProjectsReactionsService) {}

  @Post('/add')
  create(@Body() createProjectsReactionDTO: CreateProjectsReactionDTO, @Req() request: Request) {
    const userToken: {profileId: number | null} = request['user'];
    return this.projectsReactionsService.create(createProjectsReactionDTO, userToken.profileId);
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
