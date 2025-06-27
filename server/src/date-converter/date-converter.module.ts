import { Module } from '@nestjs/common';
import { DateConverterService } from './date-converter.service';
import { DateConverterController } from './date-converter.controller';

@Module({
  providers: [DateConverterService],
  controllers: [DateConverterController]
})
export class DateConverterModule {}
