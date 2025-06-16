import { Posts } from 'src/posts/posts.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: true, // Optional field
    default: null, // Default value if not provided
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 96,
    unique: true, // Ensures email is unique
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  password: string;

  @OneToMany(() => Posts, (posts) => posts.author)
  posts: Posts[]; // One user can have many posts
}
