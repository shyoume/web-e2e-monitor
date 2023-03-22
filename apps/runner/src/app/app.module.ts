import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Case, CaseRepository } from '@t-monitor/persist';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 't-monitor.sqlite',
      entities: {
        Case,
      },
    }),
    TypeOrmModule.forFeature([Case]),
  ],
  controllers: [AppController],
  providers: [AppService, CaseRepository],
})
export class AppModule {}
