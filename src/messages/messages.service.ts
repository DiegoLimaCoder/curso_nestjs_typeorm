import { Injectable, NotFoundException } from '@nestjs/common';
import { Messages } from './entities/messages.entity';

@Injectable()
export class MessagesService {
  private lastid = 1;
  private messages: Messages[] = [
    {
      id: 1,
      text: 'new text',
      from: 'Jhon',
      to: 'Maria',
      read: false,
      date: new Date(),
    },
  ];

  create(body: any) {
    this.lastid++;
    const id = this.lastid;
    const newMessage = {
      id,
      ...body,
    };
    this.messages.push(newMessage);
    return newMessage;
  }

  findAll() {
    return this.messages;
  }

  findOne(id: string) {
    const message = this.messages.find((item) => item.id === Number(id));

    if (message) return message;

    throw new NotFoundException();
  }

  update(id: string, data: any) {
    const index = this.messages.findIndex(
      (message) => message.id === Number(id),
    );

    if (index < 0) {
      throw new NotFoundException();
    }

    const existingMessage = this.messages[index];

    this.messages[index] = {
      ...existingMessage,
      ...data,
    };

    return this.messages[index];
  }

  remove(id: string) {
    const index = this.messages.findIndex((item) => item.id === Number(id));

    if (index < 0) {
      throw new NotFoundException();
    }

    this.messages.splice(index, 1);
  }
}
