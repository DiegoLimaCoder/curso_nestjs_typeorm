import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from './entities/messages.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Messages)
    private readonly messagesRepository: Repository<Messages>,
    private readonly userService: UsersService,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const { fromId, toId } = createMessageDto;
    // Encontrar a pessoa que está criando o recado
    const from = await this.userService.findOne(fromId);

    // Encontrar a pessoa para quem o recado está sendo enviado
    const to = await this.userService.findOne(toId);

    const newMessage = {
      text: createMessageDto.text,
      from,
      to,
      read: false,
      date: new Date(),
    };
    const message = await this.messagesRepository.create(newMessage);

    this.messagesRepository.save(message);

    return {
      ...message,
      from: {
        from: message.from.id,
      },
      to: {
        to: message.to.id,
      },
    };
  }

  async findAll() {
    const messages = await this.messagesRepository.find({
      relations: ['from', 'to'],
      order: {
        id: 'DESC',
      },
      select: {
        from: {
          id: true,
          name: true,
        },
        to: {
          id: true,
          name: true,
        },
      },
    });
    return messages;
  }

  async findOne(id: number) {
    const message = await this.messagesRepository.findOne({
      where: {
        id,
      },
      relations: ['from', 'to'],
      select: {
        from: {
          id: true,
          name: true,
        },
        to: {
          id: true,
          name: true,
        },
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
