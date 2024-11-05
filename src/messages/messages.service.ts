import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from './entities/messages.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { PaginationDTO } from 'src/common/dto/pagination.dto,';

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

  async findAll(paginationDto?: PaginationDTO) {
    const { limit = 10, offset = 0 } = paginationDto;

    const messages = await this.messagesRepository.find({
      take: limit, // Quantos registros serão exibidos (por página)
      skip: offset, // Quantos registros deve ser pulados
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
    const message = await this.findOne(id);

    message.text = updateMessageDto?.text ?? message.text;
    message.read = updateMessageDto?.read ?? message.read;

    await this.messagesRepository.save(message);

    return message;
  }

  async remove(id: number) {
    const message = await this.messagesRepository.findOneBy({
      id,
    });

    if (!message) throw new NotFoundException();

    return this.messagesRepository.remove(message);
  }
}
