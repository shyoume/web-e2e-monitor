import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Case, CaseRepository } from '@t-monitor/persist';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 't-monitor.sqlite',
      synchronize: true, // 生产环境一定要关闭
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
