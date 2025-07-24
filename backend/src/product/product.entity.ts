import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Review } from '../review/review.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column('decimal')
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Review, (review) => review.product, { cascade: true })
  reviews: Review[];
}
