import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('/case')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/run')
  runCase() {
    return this.appService.runCase();
  }
}
