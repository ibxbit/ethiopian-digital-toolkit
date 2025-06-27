import { Injectable } from '@nestjs/common';
import { toEthiopian, toGregorian } from 'ethiopian-date';

@Injectable()
export class DateConverterService {
  convertDate(
    direction: 'ethToGreg' | 'gregToEth',
    day: number,
    month: number,
    year: number,
  ): { converted: { day: number; month: number; year: number } } {
    if (direction === 'ethToGreg') {
      const [gy, gm, gd] = toGregorian(year, month, day);
      return { converted: { day: gd, month: gm, year: gy } };
    } else {
      const [ey, em, ed] = toEthiopian(year, month, day);
      return { converted: { day: ed, month: em, year: ey } };
    }
  }
}
