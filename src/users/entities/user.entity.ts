import { IsEmail } from 'class-validator';
import { Messages } from 'src/messages/entities/messages.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ length: 255 })
  passwordHash: string;

  // Uma pessoa pode ter enviado muitos recados (como "de")
  // Esses recados são relacionados ao campo "de" na entidade recado
  @OneToMany(() => Messages, (message) => message.from)
  messageSend: Messages[];

  // Uma pessoa pode ter recebido muitos recados (como "para")
  // Esses recados são relacionados ao campo "para" na entidade recado
  @OneToMany(() => Messages, (message) => message.to)
  messageReceived: Messages[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
