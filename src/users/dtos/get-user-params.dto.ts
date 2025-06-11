import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetUserParamsDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  id: number;
}
