import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DateConverterModule } from './date-converter/date-converter.module';

@Module({
  imports: [DateConverterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
