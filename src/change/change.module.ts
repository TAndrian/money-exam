import { Module } from '@nestjs/common';
import { ChangeService } from './service/service.service';
import { ChangeController } from './change/change.controller';
import Change from './change/change.class';

@Module({
  providers: [ChangeService, Change],
  controllers: [ChangeController],
})
export class ChangeModule {}
