import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @HttpCode(HttpStatus.OK)
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return {
      id,
      ...body,
    };
  }
}
