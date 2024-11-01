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

  async create(createMessageDto: CreateMessageDto) {
    const newMessage = {
      ...createMessageDto,
      read: false,
      date: new Date(),
    };
    const message = await this.messagesRepository.create(newMessage);

    return this.messagesRepository.save(message);
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

  async remove(id: number) {
    const message = await this.messagesRepository.findOneBy({
      id,
    });

    if (!message) throw new NotFoundException();

    return this.messagesRepository.remove(message);
  }
}
