import { registerAs } from '@nestjs/config';

export default registerAs('authConfig', () => ({
  secret: process.env.JWT_SECRET as string,
  audience: process.env.JWT_TOKEN_AUDIENCE || 'localhost:3000',
  issuer: process.env.JWT_TOKEN_ISSUER || 'localhost:3000',
  accessTokenTtl: parseInt(
    (process.env.JWT_ACCESS_TOKEN_TTL as string) ?? '3600',
    10,
  ),
  refreshTokenTtl: parseInt(
    (process.env.JWT_REFRESH_TOKEN_TTL as string) ?? '86400',
    10,
  ),
  googleClientId: process.env.GOOGLE_CLIENT_ID as string,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
}));
