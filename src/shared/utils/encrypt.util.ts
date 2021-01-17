import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { SECRET_KEY } from 'src/config/config.json';

export const baseEncrypt = (val: string) =>
  crypto
    .createHmac('sha256', SECRET_KEY)
    .update(val)
    .digest('hex');

// TODO https://github.com/typestack/class-transformer/issues/277
export const hash = async (val: string) => await bcrypt.hash(val, 10);

export const isPasswordMatching = async (val1: string, val2: string) =>
  await bcrypt.compare(val1, val2);
