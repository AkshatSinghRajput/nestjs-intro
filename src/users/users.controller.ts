import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Body,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserParamsDto } from './dtos/get-user-params.dto';

@Controller('users')
export class UsersController {
  @Get(':id')
  public getUsers(
    @Param() getUserParamsDto: GetUserParamsDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    console.log('Query:', limit, page);
    console.log('Param:', getUserParamsDto);
    return 'This action returns all users';
  }
  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    console.log('Body:', createUserDto);
    return 'This action creates a new user';
  }
}
