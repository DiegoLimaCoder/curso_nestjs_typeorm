import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @Get()
  findAll() {
    return 'Essa rota retorna todos os recados';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Essa rota rotorna um recado ID:${id}`;
  }

  @Post()
  create(@Body() data: string) {
    return data;
  }
}
