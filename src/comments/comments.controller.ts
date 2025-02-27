import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UpdateCommentDTO } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDTO: CreateCommentDTO, @Req() request: Request) {
    const userToken: {profileId: number | null} = request['user'];
    return this.commentsService.create(createCommentDTO, userToken.profileId);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDTO: UpdateCommentDTO, @Req() request: Request) {
    const userToken: {profileId: number | null} = request['user'];
    return this.commentsService.update(+id, updateCommentDTO, userToken.profileId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: Request) {
    const userToken: {profileId: number | null} = request['user'];
    return this.commentsService.remove(+id, userToken.profileId);
  }
}
