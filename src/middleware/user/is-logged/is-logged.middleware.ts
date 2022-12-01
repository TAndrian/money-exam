import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class IsLoggedMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const { user } = req.session;
    if (!user) {
      console.log('I m not logged in');
      res.status(401).json({ info: 'User not logged' });
    }
    next();
  }
}
