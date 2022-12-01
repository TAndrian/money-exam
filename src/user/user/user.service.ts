import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../helpers/user.dto';
import { User, UserDocument } from '../helpers/user.schema';
import { CryptService } from 'src/services/crypt/crypt.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    private cryptService: CryptService,
  ) {}

  // C.R.U.D. ops

  async create(userDto: CreateUserDto, hashedPassword: string): Promise<User> {
    userDto.password = hashedPassword;
    const newUser = new this.UserModel(userDto);
    return newUser.save();
  }

  async getAll(): Promise<User[]> {
    const users = await this.UserModel.find();
    return users;
  }

  async getId(id: string): Promise<User> {
    return await this.UserModel.findById(id).exec();
  }

  async update(id: string, user: User): Promise<User> {
    return await this.UserModel.findByIdAndUpdate(id, user);
  }

  async delete(id: string): Promise<any> {
    return await this.UserModel.findByIdAndDelete(id);
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const targetUser = await this.UserModel.findOne({ email });
      const isMatched = this.cryptService.matchPassword(
        password,
        targetUser.password,
      );
      if (isMatched) {
        return targetUser;
      } else {
        throw 'Wrong password';
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
