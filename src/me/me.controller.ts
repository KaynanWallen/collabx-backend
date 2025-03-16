import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { MeService } from './me.service';

@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  // @Post()
  // create(@Body() createProfileDto: CreateProfileDTO, @Req() request: Request) {
  //   return this.meService.create(createProfileDto, userToken.id);
  // }

  @Get()
  findInfos(@Req() request: Request) {
    const userToken: {profileId: number | null, id: number} = request['user'];
    return this.meService.findInfos({...userToken});
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.meService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto, @Req() request: Request) {
  //   const userToken: {profileId: number | null} = request['user'];
  //   return this.meService.update(+id, updateProfileDto, userToken.profileId);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string, @Req() request: Request) {
  //   const userToken: {profileId: number | null} = request['user'];
  //   return this.meService.remove(+id, userToken.profileId);
  // }
}
