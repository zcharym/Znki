import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

export const baseEncrypt = (val: string): string =>
  crypto
    .createHmac('sha256', '07M5oF8hwcp4') // NOTE temp, refactor in the future
    .update(val)
    .digest('hex');

// TODO https://github.com/typestack/class-transformer/issues/277
export const hash = async (val: string) => await bcrypt.hash(val, 10);

export const isPasswordMatching = async (val1: string, val2: string) =>
  await bcrypt.compare(val1, val2);
