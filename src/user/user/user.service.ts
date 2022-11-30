import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../helpers/user.dto';
import { User, UserDocument } from '../helpers/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  // C.R.U.D. ops

  async create(userDto: CreateUserDto): Promise<User> {
    try {
      const newUser = new this.UserModel(userDto);
      return newUser.save();
    } catch (error) {
      throw error;
    }
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
}
