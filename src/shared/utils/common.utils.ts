import { v4 } from 'uuid';

export const uuidV4 = (): string => v4();

export const isDev = (): boolean => process.env.NODE_ENV !== 'production';
