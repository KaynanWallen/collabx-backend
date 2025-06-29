import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDTO } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Public } from 'src/auth/constants/constants';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  create(@Body() createProfileDto: CreateProfileDTO, @Req() request: Request) {
    const userToken: {profileId: number | null, id: number} = request['user'];
    return this.profilesService.create(createProfileDto, userToken.id);
  }

  @Public()
  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string, @Query('q') q: string) {
    if(q == 'id') return this.profilesService.findOne(+id);
    if(q == 'username') return this.profilesService.findOneByUsername(id);
    return this.profilesService.findOne(+id);
  }

  @Public()
  @Get(':id/projects')
  findProfileProjects(@Param('id') id: string){
    return this.profilesService.findAllProjectsByProfileId(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto, @Req() request: Request) {
    const userToken: {profileId: number | null} = request['user'];
    return this.profilesService.update(+id, updateProfileDto, userToken.profileId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: Request) {
    const userToken: {profileId: number | null} = request['user'];
    return this.profilesService.remove(+id, userToken.profileId);
  }
}
