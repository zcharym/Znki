import * as crypto from 'crypto';

export const baseEncrypt = (val: string) => crypto.createHmac('sha256', 'TODO_KEY').update(val).digest('hex');
