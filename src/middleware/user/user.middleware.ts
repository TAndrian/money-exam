import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CryptService } from 'src/services/crypt/crypt.service';
import { User, UserDocument } from 'src/user/helpers/user.schema';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    private cryptService: CryptService,
  ) {}

  async use(req: any, res: any, next: () => void) {
    const { email, name } = req.body;
    const user = await this.UserModel.findOne({ $or: [{ email }, { name }] });
    if (user) {
      res.status(400).json({ info: 'User already exists' });
    } else {
      const filter = { email: email };
      const update = { password: this.cryptService.hash(req.body.password) };
      await this.UserModel.findOneAndUpdate(filter, update);
      next();
    }
  }
}
