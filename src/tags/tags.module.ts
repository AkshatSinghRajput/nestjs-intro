import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tags.entity';
import { TagsService } from './services/tags.service';

@Module({
  controllers: [TagsController],
  imports: [
    TypeOrmModule.forFeature([Tag]), // Add your Tag entity here when created
  ],
  providers: [TagsService],
  exports: [TagsService], // Export TagsService if needed in other modules
})
export class TagsModule {}
