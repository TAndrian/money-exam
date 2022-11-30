import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from '../helpers/user.dto';
import { UserService } from '../user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  @UsePipes(ValidationPipe)
  createUser(@Body() userDto: CreateUserDto, @Res() res: Response) {
    try {
      this.userService.create(userDto);
      return res.sendStatus(201);
    } catch (error) {
      console.log(
        '🚀 ~ file: user.controller.ts:19 ~ UserController ~ createUser ~ error',
        error,
      );
    }
  }

  @Get()
  async getAllUser(@Res() res: Response) {
    try {
      const users = await this.userService.getAll();
      return res.status(200).json({ data: users });
    } catch (error) {
      return res.json({ info: error });
    }
  }

  @Get('getById/:id')
  async getById(@Req() req: Request, @Res() res: Response) {
    const userId = req.params.id;
    try {
      const user = await this.userService.getId(userId);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json({ data: user });
      }
    } catch (error) {
      res.json({ error: 'User id undefined' });
    }
  }

  @Patch('update/:id')
  async update(@Req() req: Request, @Res() res: Response) {
    const userId = req.params.id;
    const body = req.body;
    try {
      const user = await this.userService.update(userId, body);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json({ info: 'User updated' });
      }
    } catch (error) {
      res.status(400).json({ info: 'User id undefined' });
    }
  }

  @Delete('delete/:id')
  async delete(@Req() req: Request, @Res() res: Response) {
    const userId = req.params.id;
    try {
      const user = await this.userService.delete(userId);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json({ info: 'User deleted' });
      }
    } catch (error) {
      res.status(400).json({ info: 'User id undefined' });
    }
  }
}
