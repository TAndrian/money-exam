import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ChangeService } from '../service/service.service';

@Controller('change')
export class ChangeController {
  constructor(private readonly changeService: ChangeService) {}
  @Get('')
  getChange(@Res() res: Response): Response {
    return res.status(200).json({ info: 'hello' });
  }

  @Post('/convert/:value')
  change(
    @Param('value', ParseIntPipe) value: number,
    @Res() res: Response,
  ): Response {
    return res.status(200).json({ data: this.changeService.change(value) });
  }
}
