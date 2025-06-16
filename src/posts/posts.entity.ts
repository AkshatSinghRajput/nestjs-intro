import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { postTypes } from './enums/post-types.enum';
import { postStatus } from './enums/post-status.enum';
import { MetaOption } from 'src/meta-options/meta-options.entity';
import { User } from 'src/users/user.entity';
import { Tag } from 'src/tags/tags.entity';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'enum',
    enum: postTypes,
    nullable: false,
  })
  postType: postTypes;

  @Column({
    type: 'varchar',
    length: 96,
    unique: true,
    nullable: false,
  })
  slug: string;

  @Column({
    type: 'enum',
    enum: postStatus,
    nullable: false,
  })
  status: postStatus;

  @Column({
    type: 'text',
    nullable: true,
    default: '',
  })
  content: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  schema: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
  })
  featuredImageUrl: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  publishOn: Date;

  @ManyToMany(() => Tag, (tag) => tag.posts, {
    eager: true,
  })
  @JoinTable()
  tags: Tag[];

  @OneToOne(() => MetaOption, (metaOption) => metaOption.post, {
    cascade: true,
    eager: true,
  })
  metaOptions: MetaOption | null;

  @ManyToOne(() => User, (user) => user.posts, {
    eager: true,
  })
  author: User;
}
