import { Injectable } from '@nestjs/common';
import { Messages } from './entities/messages.entity';

@Injectable()
export class MessagesService {
  private lastid = 1;
  private menssages: Messages[] = [
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
    this.menssages.push(newMessage);
    return newMessage;
  }

  findAll() {
    return this.menssages;
  }

  findOne(id: string) {
    return this.menssages.find((item) => item.id === Number(id));
  }

  update(id: string, body: any) {
    const index = this.menssages.findIndex((item) => item.id === Number(id));

    if (index >= 0) {
      const messageExisting = this.menssages[index];

      this.menssages[index] = {
        ...messageExisting,
        ...body,
      };
    }
  }

  remove(id: string) {
    const index = this.menssages.findIndex((item) => item.id === Number(id));
    if (index >= 0) {
      this.menssages.splice(index, 1);
    }
  }
}
