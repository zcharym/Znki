import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateNoteDto } from '../dto/create-note.dto';
import { NoteService } from '../service/note.service';

@ApiTags('Note')
@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Post()
  async addDeck(@Body() body: CreateNoteDto) {
    return this.noteService.createNote(body);
  }
}
