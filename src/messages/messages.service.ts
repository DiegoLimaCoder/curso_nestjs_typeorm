import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
  findAll() {
    return `Essa rota rotorna todos os recados`;
  }
}
