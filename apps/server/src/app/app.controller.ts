import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('/case')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/info')
  getData() {
    return this.appService.getData();
  }

  @Post('/upsert')
  setData(@Body() requestData) {
    return this.appService.saveData(requestData);
  }
}
