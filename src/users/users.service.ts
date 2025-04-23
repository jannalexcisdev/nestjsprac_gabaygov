import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationUsers } from './entities/users.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {
    
  constructor (
    @InjectRepository(OrganizationUsers)
    private readonly usersRepository: Repository<OrganizationUsers>) {}
  
  async createUser(createUserDto: CreateUserDto) {
    try {
      const newUser = this.usersRepository.create(createUserDto);
      return await this.usersRepository.save(newUser);
    } catch (error) {
      throw new InternalServerErrorException ('Failed to Create User')
    }
  } //DI SINASABI ERROR 

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
      Object.assign(user, updateUserDto);
      return this.usersRepository.save(user);
    }catch (error) {
      throw new InternalServerErrorException ('Failed to Update User')
    }
  } //ALWAYS SUCCESS KET WALA NANG NAUUPDATE

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