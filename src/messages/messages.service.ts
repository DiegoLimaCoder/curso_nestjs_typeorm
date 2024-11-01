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

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const partialUpdateMessageDto = {
      text: updateMessageDto?.text,
      read: updateMessageDto?.read,
    };

    const message = await this.messagesRepository.preload({
      id,
      ...partialUpdateMessageDto,
    });

    if (!message) throw new NotFoundException();

    return await this.messagesRepository.save(message);
  }

  async remove(id: number) {
    const message = await this.messagesRepository.findOneBy({
      id,
    });

    if (!message) throw new NotFoundException();

    return this.messagesRepository.remove(message);
  }
}
