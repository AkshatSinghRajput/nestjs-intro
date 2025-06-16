import { Posts } from 'src/posts/posts.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
    unique: true, // Ensures tag name is unique
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 256,
    unique: true, // Ensures email is unique
    nullable: false,
  })
  slug: string;

  @Column({
    type: 'text',
    nullable: true, // Optional field
  })
  description?: string;

  @Column({
    type: 'text',
    default: true, // Default value if not provided
  })
  schema?: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true, // Optional field
  })
  featuredImage?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToMany(() => Posts, (post) => post.tags, {
    onDelete: 'CASCADE', // Ensures that if a tag is deleted, the relationship with posts is also removed
  })
  posts: Posts[]; // Many-to-many relationship with Posts entity
}
