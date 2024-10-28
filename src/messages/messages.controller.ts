import { Controller, Get } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @Get()
  findAll() {
    return 'Essa rota retorna todos os recados';
  }

  @Get()
  findOne() {
    return 'Essa rota rotorna um recado';
  }
}
