import { Injectable } from '@nestjs/common';
import { CaseRepository, CaseStep } from '@t-monitor/persist';

@Injectable()
export class AppService {
  constructor(private caseRepo: CaseRepository) {}

  getData() {
    return this.caseRepo.getCase();
  }

  saveData(steps: Array<CaseStep>) {
    return this.caseRepo.saveCase(steps);
  }
}
