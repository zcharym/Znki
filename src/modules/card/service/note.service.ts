import { Note } from 'src/models/note.model';
import { Card } from 'src/models/card.model';
import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateNoteDto } from '../dto/create-note.dto';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note) readonly deckRepo: Repository<Note>,
    @InjectRepository(Card) readonly cardRepo: Repository<Card>,
    @InjectRepository(Note) readonly noteRepo: Repository<Note>,
  ) {}

  /**
   * create new note
   *
   * @param newNote
   */
  async createNote(newNote: CreateNoteDto): Promise<number> {
    const card = await this.cardRepo.find({ id: newNote.cid });
    if (!card) {
      throw new NotFoundException('card not found');
    }
    const note = await this.noteRepo.save(newNote);
    return note.id;
  }
}
