import { Injectable, Logger } from '@nestjs/common';
import vm from 'vm';
import { Case, CaseRepository } from '@t-monitor/persist';
import { runnerTemplate } from './runner-template';
import typescript, { ModuleKind, ScriptTarget } from 'typescript';
import { chromium, expect } from '@playwright/test';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);

  constructor(private caseRepo: CaseRepository) {}

  // 10s 检测一次
  // @Cron('5 * * * * *')
  async runCase() {
    const runnerCase = await this.caseRepo.getCase();

    if (!runnerCase) {
      this.logger.log('无 Case 可执行');

      return;
    }

    // if (runnerCase.status === 'running') {
    //   this.logger.log('Case 正在运行');

    //   return;
    // }

    try {
      await this.caseRepo.updateStatus(true);
      this.logger.log('即将执行 Case');
      this.execute(runnerCase);
      this.logger.log('执行成功');
    } catch (e) {
      this.logger.error('Case 执行失败');
    } finally {
      await this.caseRepo.updateStatus(false);
    }
  }

  async execute(runnerCase: Case) {
    // const script = runnerTemplate('执行 Case');
    // const result = typescript.transpileModule(script, {
    //   compilerOptions: {
    //     module: ModuleKind.CommonJS,
    //     target: ScriptTarget.ES2015,
    //     declaration: false,
    //     sourceMap: false,
    //   },
    // });

    // return vm.runInThisContext(result.outputText)(require, runnerCase);
    const browser = await chromium.launch({
      headless: false,
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    /**
     * 在这里执行你的逻辑
     */
    // await page.goto('https://baidu.com', { waitUntil: 'networkidle' });
    for (const step of runnerCase.steps) {
      if (step.name === 'goto') {
        await page.goto(step.data.url as string, { waitUntil: 'networkidle' });
      }
    }
  }
}
