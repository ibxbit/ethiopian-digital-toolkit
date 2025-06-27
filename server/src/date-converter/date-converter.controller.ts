import { Controller, Post, Body, Get } from '@nestjs/common';
import { DateConverterService } from './date-converter.service';
import { toEthiopian } from 'ethiopian-date'; // 👈 This import is key

@Controller('convert-date')
export class DateConverterController {
  constructor(private readonly dateConverterService: DateConverterService) {}

  @Post()
  convert(@Body() body: {
    direction: 'ethToGreg' | 'gregToEth',
    day: number,
    month: number,
    year: number
  }) {
    return this.dateConverterService.convertDate(body.direction, body.day, body.month, body.year);
  }

  @Get('today')
  getToday() {
    const today = new Date();
    const [ey, em, ed] = toEthiopian(today.getFullYear(), today.getMonth() + 1, today.getDate());

    return {
      gregorian: {
        day: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear(),
      },
      ethiopian: {
        day: ed,
        month: em,
        year: ey,
      },
    };
  }
}
