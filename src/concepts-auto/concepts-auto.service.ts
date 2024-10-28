import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceptsAutoService {
  getHome() {
    return 'Conceitos automatico (service)';
  }
}
