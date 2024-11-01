import { Injectable, NotFoundException } from '@nestjs/common';
import { Messages } from './entities/messages.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

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

  create(createMessageDto: CreateMessageDto) {
    this.lastid++;
    const id = this.lastid;
    const newMessage = {
      id,
      ...createMessageDto,
      read: false,
      date: new Date(),
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

  update(id: string, updateMessageDto: UpdateMessageDto) {
    const index = this.messages.findIndex(
      (message) => message.id === Number(id),
    );

    if (index < 0) {
      throw new NotFoundException();
    }

    const existingMessage = this.messages[index];

    this.messages[index] = {
      ...existingMessage,
      ...updateMessageDto,
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
