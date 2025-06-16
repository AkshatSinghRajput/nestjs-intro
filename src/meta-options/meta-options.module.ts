import { Module } from '@nestjs/common';
import { MetaOptionsController } from './meta-options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOption } from './meta-options.entity';
import { MetaOptionsService } from './services/meta-options.service';

@Module({
  controllers: [MetaOptionsController],
  imports: [
    TypeOrmModule.forFeature([MetaOption]), // Add your MetaOptions entity here when created
  ],
  providers: [MetaOptionsService],
})
export class MetaOptionsModule {}
