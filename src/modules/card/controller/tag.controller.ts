import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { TagService } from '../service/tag.service';
import { TagResDto } from '../dto/tag-res.dto';
import { CreateTagDto } from '../dto/create-tag.dto';
import { JWTGuard } from '../../auth/jwt.guard';

@ApiTags('Tag')
@Controller('tag')
@UseGuards(JWTGuard)
export class TagController {
  constructor(private tagService: TagService) {}

  @Post()
  async addTag(@Body() body: CreateTagDto) {
    await this.tagService.addTag(body);
  }

  @Delete()
  async removeTags() {}
}
