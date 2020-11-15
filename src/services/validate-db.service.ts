import { Attachment } from './../model/attachment.entity';
import { Group } from './../model/group.entity';
import { User } from './../model/user.entity';
import { Record } from 'src/model';
import { Tag } from './../model/tag.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ValidateDbService {
  constructor(
    @InjectRepository(Tag) readonly TagRepo: Repository<Tag>,
    @InjectRepository(Record) readonly RecordRepo: Repository<Record>,
    @InjectRepository(User) readonly UserRepo: Repository<User>,
    @InjectRepository(Group) readonly GroupRepo: Repository<Group>,
    @InjectRepository(Attachment)
    readonly AttachmentRepo: Repository<Attachment>,
  ) {}
}
