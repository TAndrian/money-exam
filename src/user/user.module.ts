import { Module } from '@nestjs/common';

import { UserService } from './user/user.service';
import { UserController } from './controller/user.controller';
import { CryptService } from 'src/services/crypt/crypt.service';

@Module({
  providers: [UserService],
  controllers: [UserController, UserService, CryptService],
})
export class UserModule {}
