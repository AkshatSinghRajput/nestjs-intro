import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST,
  name: process.env.DATABASE_NAME,
  port: parseInt(process.env.DATABASE_PORT as string) || 5432,
  password: process.env.DATABASE_PASSWORD,
  user: process.env.DATABASE_USER,
  synchronize: process.env.DATABASE_SYNC === 'true' ? true : false,
  autoLoadEntities: process.env.DATABASE_AUTOLOAD === 'true' ? true : false,
}));
