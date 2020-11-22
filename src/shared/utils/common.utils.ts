import { v4 } from 'uuid';

export const uuid = () => v4();

export const isDev = () => process.env.NODE_ENV !== 'production';
