import { Body, Controller , Post, Patch, Get, Delete, ValidationPipe, Param, ParseIntPipe} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';


@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Post(':register')
  register(@Body(ValidationPipe) createUserDto: CreateUserDto) {
      return this.usersService.createUser(createUserDto);
  }
  
  @Get()
  findAll() {
      return this.usersService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe)id:number) {
  //     return this.usersService.findOne(id)
  // }

  @Post('login')
  async login(@Body(ValidationPipe) loginDto:LoginDto) {
    return this.usersService.login_user(loginDto);
  }//WHITELISTING?

  @Patch(':id') 
  update_user(@Param('id', ParseIntPipe) id:number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
      return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id:number) {
      return this.usersService.delete(id)
  }
}
