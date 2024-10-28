import { Controller, Get } from '@nestjs/common';
import { ConceptsAutoService } from './concepts-auto.service';

@Controller('conceito-automatico')
export class ConceptsAutoController {
  constructor(private readonly conceptsAuto: ConceptsAutoService) {}

  @Get()
  home() {
    return this.conceptsAuto.getHome();
  }
}
