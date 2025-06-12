import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Body,
  ParseIntPipe,
  DefaultValuePipe,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserParamsDto } from './dtos/get-user-params.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './services/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/{:id}')
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Fetch a user by their unique identifier.',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
    type: CreateUserDto, // Assuming CreateUserDto is used for the response
  })
  @ApiQuery({
    name: 'id',
    required: false,
    description: 'The unique identifier of the user',
    type: 'number',
    example: 1234,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'The maximum number of users to return',
    type: 'number',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'The page number for pagination',
    type: 'number',
    example: 1,
  })
  public getUsers(
    @Param() getUserParamsDto: GetUserParamsDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    if (getUserParamsDto.id) {
      return this.usersService.getUserById(getUserParamsDto);
    }
    return this.usersService.getUsers(getUserParamsDto, limit, page);
  }
  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    console.log('Body:', createUserDto);
    return 'This action creates a new user';
  }

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }
}
