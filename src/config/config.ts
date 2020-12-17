import { isDev } from '../shared/utils';

export const configPath = isDev ? 'src/config/config.dev.env' : 'src/config/config.prod.env';
