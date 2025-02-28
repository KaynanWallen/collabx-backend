import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDTO } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  create(@Body() createProfileDto: CreateProfileDTO, @Req() request: Request) {
    const userToken: {profileId: number | null, id: number} = request['user'];
    return this.profilesService.create(createProfileDto, userToken.id);
  }

  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(+id);
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
