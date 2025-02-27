import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDTO } from './dto/create-project.dto';
import { UpdateProjectDTO } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDTO: CreateProjectDTO, @Req() request: Request) {
    const userToken: {profileId: number | null} = request['user'];
    return this.projectsService.create(createProjectDTO, userToken.profileId);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Get(':id/comments')
  findCommentsByProjectId(@Param('id') id: string) {
    return this.projectsService.findCommentsByProjectId(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDTO: UpdateProjectDTO, @Req() request: Request) {
    const userToken: {profileId: number | null} = request['user'];
    return this.projectsService.update(+id, updateProjectDTO, userToken.profileId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: Request) {
    const userToken: {profileId: number | null} = request['user'];
    return this.projectsService.remove(+id, userToken.profileId);
  }
}
