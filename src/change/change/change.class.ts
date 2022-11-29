import { IChange } from './change.interface';

export default class Change implements IChange {
  coin2: number;
  bill5: number;
  bill10: number;

  constructor() {
    this.coin2 = 0;
    this.bill5 = 0;
    this.bill10 = 0;
  }

  optimalChange(money: number): Change {
    const change = new Change();

    if (this.isNumberEndsWith7(money)) {
      this.coin2 += 1;
      this.bill5 += 1;
    } else if (money % 2 !== 0 && money % 5 !== 0) {
      throw 'no change possible ...';
    }
    if (money === 10) {
      change.bill5 = 2;
      return change;
    } else {
      return this.optimalChangeRecursive(money, change);
    }
  }

  private optimalChangeRecursive(money: number, change: Change): Change {
    let decrementor = 0;
    if (money === 0) {
      return change;
    } else if (money % 10 === 0) {
      change.bill10 = money / 10;
      decrementor = change.bill10 * 10;
    } else if (money % 5 === 0) {
      change.bill5++;
      decrementor = 5;
    } else {
      change.coin2++;
      decrementor = 2;
    }
    return this.optimalChangeRecursive(money - decrementor, change);
  }

  /**
   *
   * @param number : special first number where the number's termination is a 7 which is a result of 5 + 2
   *               example : 7 = 5 + 2 or 27 = 25 + 2
   * @return true if the number's termination is 7
   */
  private isNumberEndsWith7(n: number): boolean {
    return (n - 2) % 5 === 0;
  }
}
