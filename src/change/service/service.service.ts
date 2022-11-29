import { Injectable } from '@nestjs/common';
import Change from '../change/change.class';

@Injectable()
export class ChangeService {
  change(money: number): Change {
    const change = new Change();
    return change.optimalChange(money);
  }
}
