import { Injectable } from '@nestjs/common';
import { User, UserDocument } from 'src/database/schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../helpers/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const newUser = new this.UserModel(userDto);
    return newUser.save();
  }

  async getAll(): Promise<User[]> {
    return await this.UserModel.find({}).exec();
  }

  async getId(id: string): Promise<User> {
    return await this.UserModel.findById(id).exec();
  }

  async update(id: string, user: User): Promise<User> {
    return await this.UserModel.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id: string): Promise<any> {
    return await this.UserModel.findByIdAndDelete(id);
  }
}
