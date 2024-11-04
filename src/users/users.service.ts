import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const dateUser = {
        name: createUserDto.name,
        email: createUserDto.email,
        passwordHash: createUserDto.password,
      };

      const newUser = this.userRepository.create(dateUser);
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email is already registered');
      }
      throw error;
    }
  }

  async findAll() {
    const user = await this.userRepository.find({
      order: {
        id: 'DESC',
      },
    });
    return user;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({
      id,
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const dateUser = {
      name: updateUserDto?.name,
      passwordHash: updateUserDto?.password,
    };

    const user = await this.userRepository.preload({
      id,
      ...dateUser,
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    this.userRepository.remove(user);
  }
}
