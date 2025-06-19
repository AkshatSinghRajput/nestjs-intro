import { Injectable } from '@nestjs/common';
import { HashingProvider } from '../providers/hashing.provider';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements HashingProvider {
  async hashPassword(data: string | Buffer): Promise<string> {
    // Generate a salt with 10 rounds
    const salt = await bcrypt.genSalt();

    return bcrypt.hash(data, salt);
  }
  comparePassword(data: string | Buffer, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }
}
