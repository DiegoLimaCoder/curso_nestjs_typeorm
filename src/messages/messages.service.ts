import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from './entities/messages.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Messages)
    private readonly messagesRepository: Repository<Messages>,
  ) {}

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

  async findAll() {
    const messages = await this.messagesRepository.find();
    return messages;
  }

  async findOne(id: number) {
    const message = await this.messagesRepository.findOne({
      where: {
        id,
      },
    });

    if (message) return message;

    throw new NotFoundException();
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    const index = this.messages.findIndex((message) => message.id === id);

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

  remove(id: number) {
    const index = this.messages.findIndex((item) => item.id === id);

    if (index < 0) {
      throw new NotFoundException();
    }

    this.messages.splice(index, 1);
  }
}
