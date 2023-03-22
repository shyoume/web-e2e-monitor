import { Column, Entity, PrimaryColumn, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

export interface CaseStep {
  name: string;
  data: Record<string, unknown>;
}

export type CaseStatus = 'running' | 'ready';

@Entity('case')
export class Case {
  @PrimaryColumn('int')
  id: number;

  @Column('text')
  stepsText: string;

  @Column('varchar')
  status: CaseStatus;

  steps: CaseStep[];
}

@Injectable()
export class CaseRepository extends Repository<Case> {
  constructor(
    @InjectRepository(Case)
    repository: Repository<Case>
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getCase() {
    const data = await this.findOne({
      where: {
        id: 1,
      },
    });

    if (!data) {
      return null;
    }

    data.steps = JSON.parse(data.stepsText);

    return data;
  }

  updateStatus(willRun: boolean) {
    return this.update(
      {
        id: 1,
      },
      {
        status: willRun ? 'running' : 'ready',
      }
    );
  }

  saveCase(steps: Array<CaseStep>) {
    return this.save({
      id: 1,
      stepsText: JSON.stringify(steps),
      status: 'ready',
    });
  }
}
