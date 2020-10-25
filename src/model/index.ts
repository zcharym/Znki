import { Attachment } from './attachment.entity';
import { Group } from './group.entity';
import { Record } from './record.entity';
import { Tag } from './tag.entity';
import { User } from './user.entity';

export * from './group.entity';
export * from './tag.entity';
export * from './user.entity';
export * from './attachment.entity';
export * from './record.entity';

export const ENTITES = [Group, Tag, User, Attachment, Record];
