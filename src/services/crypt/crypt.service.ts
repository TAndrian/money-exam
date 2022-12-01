import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptService {
  /**
   *
   * @param password
   * @returns hashed password
   */
  hash(password: string): string {
    const hashSaltRounds = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, hashSaltRounds);
  }

  /**
   *
   * @param password
   * @param hashedPassword
   * @returns true if the password which will be hashed is equals to the hashed password stored inside the database
   */
  matchPassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
  }
}
