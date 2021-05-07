import { v4 } from 'uuid';
import { pickBy, identity } from 'lodash';

export const uuidV4 = (): string => v4();

export const filterObject = (o: {
  [key: string]: any;
}): { [key: string]: any } => pickBy(o, identity);
