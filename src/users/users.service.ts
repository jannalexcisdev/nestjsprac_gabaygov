import { Injectable, InternalServerErrorException, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationUsers } from './entities/users.entity';
import { LoginDto } from './dto/login.dto';
import { subscribe } from 'diagnostics_channel';

@Injectable()
export class UsersService {
    
  constructor (
    @InjectRepository(OrganizationUsers)
    private readonly usersRepository: Repository<OrganizationUsers>) {}

  async createUser(createUserDto: CreateUserDto) {
    if (await this.check_email(createUserDto.email)) {
      throw new ConflictException('Email already exists');
    }
    if (await this.check_username(createUserDto.username)) {
      throw new ConflictException('username already exists');
    }
    try {
      const newUser = this.usersRepository.create(createUserDto);
      return await this.usersRepository.save(newUser);
    } catch (error) {
      throw new InternalServerErrorException('Failed to Create User');
    }
  }

  async check_email (subscriber_email:string) {
    return await this.usersRepository.findOne({ where: { email: subscriber_email } })
  }

  async check_username (subscriber_username:string) {
    return await this.usersRepository.findOne({ where: { username: subscriber_username } })
  }

  async findAll() {
    try {
      const user = await this.usersRepository.find()
      if (!user) {
        throw new NotFoundException('User Not Found')
      }
      return user
    } catch (error) {
      throw new InternalServerErrorException ('Failed to Fetch User')
    }
  }

  async login_user(loginDto: LoginDto) {
    const { username, password } = loginDto;
    try {
      const user = await this.usersRepository.findOne({ where: { username, password } });
      if (!user) throw new NotFoundException('User Not Found');
      return user;
    }catch (error) {
      throw new InternalServerErrorException ('Failed to Login User')
    }
  }

  async update(id:number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersRepository.findOne({where:{id}});
      if (!user) {
          throw new NotFoundException(`User with id ${id} not found`);
      }
      const before = JSON.stringify(user);
      Object.assign(user, updateUserDto);
      const after = JSON.stringify(user);
      if (before === after) {
        throw new ConflictException('No changes detected');
      }
      return await this.usersRepository.save(user);
    }catch (error) {
      throw new InternalServerErrorException ('Failed to Update User')
    }
  }

  async delete(id:number) {
    try {
      const user = await this.usersRepository.findOne({where:{id}});
      if (!user) {
          throw new NotFoundException(`User with id ${id} not found`)
      }
      return this.usersRepository.remove(user)
    } catch (error) {
      throw new InternalServerErrorException ('Failed to Delete User')
    }
  }
}