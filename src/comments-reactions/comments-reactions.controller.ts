import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Inject } from '@nestjs/common';
import { CommentsReactionsService } from './comments-reactions.service';
import { UpdateCommentsReactionDTO } from './dto/update-comments-reaction.dto';
import { CreateCommentsReactionDTO } from './dto/create-comments-reaction.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bullmq';

@Controller('comments-reactions')
export class CommentsReactionsController {
  constructor(
    private readonly commentsReactionsService: CommentsReactionsService,
    // @InjectQueue('commentsReactionsQueue') private commentReactionQueue: Queue,
  ) {}

  @Post('/add')
  create(@Body() createCommentsReactionDTO: CreateCommentsReactionDTO, @Req() request: Request) {
    const userToken: {profileId: number | null} = request['user'];
    return this.commentsReactionsService.create(createCommentsReactionDTO, userToken.profileId);
  }

  @Post('/toggle')
  toggle(@Body() toggleCommentReaction: CreateCommentsReactionDTO, @Req() request: Request) {
    const userToken: {profileId: number | null} = request['user'];
    return this.commentsReactionsService.toggle(toggleCommentReaction, userToken.profileId);
    // this.commentReactionQueue.add('reaction-job', { toggleCommentReaction, userToken: userToken.profileId });
    // return {message: 'ok'}
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
