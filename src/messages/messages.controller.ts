import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() pagination: any) {
    const { limit = 10, offset = 0 } = pagination;
    return `Retorna todos os recados. Limit=${limit}, Offeset=${offset}`;
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'Essa roda apagar o id:' + id;
  }
}
