import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDTO } from './dto/create-project.dto';
import { UpdateProjectDTO } from './dto/update-project.dto';
import { AddImageProjectDTO } from './dto/add-image-project.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/constants/constants';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDTO: CreateProjectDTO, @Req() request: Request) {
    const userToken: {profileId: number | null} = request['user'];
    return this.projectsService.create(createProjectDTO, userToken.profileId);
  }
  
  @Post(':id/add-image')
  @UseInterceptors(FileInterceptor('file'))
  addImageProject(@UploadedFile() file: Express.Multer.File , @Req() request: Request, @Param('id') id: string) {
    const userToken: {profileId: number | null} = request['user'];
    return this.projectsService.addImageProject(file, +id, userToken.profileId)
  }

  @Public()
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id/image')
  findImageByProjectId(@Param('id') id: string) {
    return this.projectsService.findImageByProjectId(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Get(':id/comments')
  findCommentsByProjectId(@Param('id') id: string) {
    return this.projectsService.findCommentsByProjectId(+id);
  }
  
  @Get('/:id/reactions')
  findAllProjectsReactionsByCommentId(@Param('id') id: string) {
    return this.projectsService.findAllProjectsReactionsByProjectId(+id);
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
