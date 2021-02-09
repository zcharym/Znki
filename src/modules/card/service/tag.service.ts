import { Injectable } from '@nestjs/common';
import { DbService } from 'src/shared/db/db.service';

@Injectable()
export class TagService {
  constructor(private db: DbService) {}
}
