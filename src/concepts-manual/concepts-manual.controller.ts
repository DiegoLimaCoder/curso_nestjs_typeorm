import { Controller, Get } from '@nestjs/common';

@Controller('conceito-manual')
export class ConceptsManualController {
  @Get()
  home() {
    return 'Conceito-manual';
  }
}
