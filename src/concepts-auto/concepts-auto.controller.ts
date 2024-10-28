import { Controller, Get } from '@nestjs/common';

@Controller('conceito-automatico')
export class ConceptsAutoController {
  @Get()
  home() {
    return 'Conceito-automatico';
  }
}
