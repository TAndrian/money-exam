import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/helpers/user.schema';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async use(req: any, res: any, next: () => void) {
    const { email, name } = req.body;
    const user = await this.UserModel.findOne({ $or: [{ email }, { name }] });
    if (user) {
      res.status(400).json({ info: 'User already exists' });
    } else {
      next();
    }
  }
}
