import { registerAs } from '@nestjs/config';

export default registerAs('authConfig', () => ({
  secret: process.env.JWT_SECRET as string,
  audience: process.env.JWT_TOKEN_AUDIENCE || 'localhost:3000',
  issuer: process.env.JWT_TOKEN_ISSUER || 'localhost:3000',
  accessTokenTtl:
    parseInt(process.env.JWT_ACCESS_TOKEN_TTL as string) || '3600',
}));
