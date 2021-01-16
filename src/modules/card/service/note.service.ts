import { Note } from 'src/models/note.model';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateNoteDto } from '../dto/create-note.dto';

@Injectable()
export class NoteService {
  constructor(@InjectRepository(Note) readonly deckRepo: Repository<Note>) {}

  async createNote(note: CreateNoteDto): Promise<number> {
    return 1;
  }
}
