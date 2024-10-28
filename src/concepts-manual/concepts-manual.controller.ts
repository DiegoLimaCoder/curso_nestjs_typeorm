import { Controller, Get } from '@nestjs/common';
import { ConceptsManualService } from './cencepts-manual.service';

@Controller('conceito-manual')
export class ConceptsManualController {
  constructor(private readonly conceptsManual: ConceptsManualService) {}

  @Get()
  home() {
    return this.conceptsManual.solucionaHome();
  }
}
