import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CommentsReactionsService } from './comments-reactions.service';
import { UpdateCommentsReactionDTO } from './dto/update-comments-reaction.dto';
import { CreateCommentsReactionDTO } from './dto/create-comments-reaction.dto';

@Controller('comments-reactions')
export class CommentsReactionsController {
  constructor(private readonly commentsReactionsService: CommentsReactionsService) {}

  @Post('/add')
  create(@Body() createCommentsReactionDTO: CreateCommentsReactionDTO, @Req() request: Request) {
    const userToken: {profileId: number | null} = request['user'];
    return this.commentsReactionsService.create(createCommentsReactionDTO, userToken.profileId);
  }

  @Get()
  findAll() {
    return this.commentsReactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsReactionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentsReactionDTO: UpdateCommentsReactionDTO, @Req() request: Request) {
    const userToken: {profileId: number | null} = request['user'];
    return this.commentsReactionsService.update(+id, updateCommentsReactionDTO, userToken.profileId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: Request) {
    const userToken: {profileId: number | null} = request['user'];
    return this.commentsReactionsService.remove(+id, userToken.profileId);
  }
}
