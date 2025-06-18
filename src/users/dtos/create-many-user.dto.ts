import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateManyUserDto {
  /**
   * An array of user objects to be created.
   *
   * Each object should conform to the CreateUserDto structure.
   * This allows for bulk creation of users in a single request.
   *
   * @type {CreateUserDto[]}
   * @memberof CreateManyUserDto
   */

  @ApiProperty({
    type: 'array',
    required: true,
    items: {
      type: 'User',
    },
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  users: CreateUserDto[];
}
