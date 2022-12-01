import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/helpers/user.schema';

@Injectable()
export class CheckIfUserExistsMiddleware implements NestMiddleware {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async use(req: any, res: any, next: () => void) {
    const userId = req.params.id;
    const user = await this.UserModel.findById(userId);
    if (!user) {
      res.status(404).json({ info: 'User not found' });
    } else {
      next();
    }
  }
}
