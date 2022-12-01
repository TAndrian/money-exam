import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  Res,
  Session,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CryptService } from 'src/services/crypt/crypt.service';
import { CreateUserDto } from '../helpers/user.dto';
import { UserService } from '../user/user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private cryptService: CryptService,
  ) {}

  @Post('/create')
  @UsePipes(ValidationPipe)
  createUser(@Body() userDto: CreateUserDto, @Res() res: Response) {
    const password = this.cryptService.hash(userDto.password);
    try {
      this.userService.create(userDto, password);
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
      res.json({ data: user });
    } catch (error) {
      res.json({ error: 'User id undefined' });
    }
  }

  @Patch('update/:id')
  update(@Req() req: Request, @Res() res: Response) {
    const userId = req.params.id;
    const body = req.body;
    try {
      this.userService.update(userId, body);
      res.status(200).json({ info: 'User updated' });
    } catch (error) {
      res.status(400).json({ info: 'User id undefined' });
    }
  }

  @Delete('delete/:id')
  delete(@Req() req: Request, @Res() res: Response) {
    const userId = req.params.id;
    try {
      this.userService.delete(userId);
      res.status(200).json({ info: 'User deleted' });
    } catch (error) {
      res.status(400).json({ info: 'User id undefined' });
    }
  }

  @Post('login')
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @Session() session: Record<string, any>,
  ) {
    const { email, password } = req.body;
    if (!email || !password) throw 'Invalid credential';
    try {
      const user = await this.userService.login(email, password);
      if (!session.user) {
        session.user = {
          user: user,
        };
      } else {
        session.user = user;
      }
      res.sendStatus(200);
    } catch (error) {
      res.status(400).json({ info: 'Bad credential' });
      console.log(
        '🚀 ~ file: user.controller.ts:89 ~ UserController ~ login ~ error',
        error,
      );
    }
  }
}
