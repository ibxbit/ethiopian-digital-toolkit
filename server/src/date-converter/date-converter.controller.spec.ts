import { Test, TestingModule } from '@nestjs/testing';
import { DateConverterController } from './date-converter.controller';


describe('DateConverterController', () => {
  let controller: DateConverterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DateConverterController],
    }).compile();

    controller = module.get<DateConverterController>(DateConverterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
