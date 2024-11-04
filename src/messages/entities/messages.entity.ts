import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Messages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  text: string;

  // Muitos recados podem ser enviados por uma única pessoa (emissor)
  @ManyToOne(() => User)
  // Especifica a coluna "de" que armazena o ID da pessoa que enviou o recado
  @JoinColumn({ name: 'from' })
  from: User;

  // Muitos recados podem ser enviados para uma única pessoa (destinatário)
  @ManyToOne(() => User)
  // Especifica a coluna "para" que armazena o ID da pessoa que recebe o recado
  @JoinColumn({ name: 'to' })
  to: User;

  @Column({ default: false })
  read: boolean;

  @CreateDateColumn()
  createdAt?: Date; // createdAt

  @UpdateDateColumn()
  updatedAt?: Date; // updatedAt
}
