import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from '../meta-options.entity';
import { Repository } from 'typeorm';
import { CreatePostMetaOptionDto } from '../dtos/create-post-meta-option.dto';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOption)
    private metaOptionsRepository: Repository<MetaOption>,
  ) {}

  public async createMetaOption(createMetaOptionDto: CreatePostMetaOptionDto) {
    let newMetaOptions = this.metaOptionsRepository.create(createMetaOptionDto);
    newMetaOptions = await this.metaOptionsRepository.save(newMetaOptions);
    return newMetaOptions;
  }
}
