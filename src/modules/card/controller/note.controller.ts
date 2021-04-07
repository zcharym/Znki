import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateNoteDto } from '../dto/create-note.dto';
import { NoteService } from '../service/note.service';
import { JWTGuard } from '../../auth/jwt.guard';

@ApiTags('Note')
@Controller('note')
@UseGuards(JWTGuard)
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Post()
  async addNote(@Body() body: CreateNoteDto) {
    // return this.noteService.createNote(body);
    return 'NOT IMPLEMENTED';
  }
}
