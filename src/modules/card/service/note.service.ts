import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/shared/db/db.service';
import { CreateNoteDto } from '../dto/create-note.dto';

@Injectable()
export class NoteService {
  constructor(private db: DbService) {}

  /**
   * create new note
   *
   * @param newNote
   */
  async createNote(newNote: CreateNoteDto): Promise<number> {
    // TODO
    // const card = await this.db.card.findFirst({
    //   where: {
    //     id: newNote.cardId,
    //   },
    // });
    // if (!card) {
    //   throw new NotFoundException('card not found');
    // }
    // const note = await this.db.note.create({ data: newNote });
    return Promise.resolve(1);
  }
}
