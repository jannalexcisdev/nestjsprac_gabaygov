import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationUsers } from './entities/users.entity';

@Injectable()
export class UsersService {
    
    constructor (
        @InjectRepository(OrganizationUsers)
        private readonly usersRepository: Repository<OrganizationUsers>) {}

    
    async createUser(createUserDto: CreateUserDto) {
        const newUser = this.usersRepository.create(createUserDto);
        return await this.usersRepository.save(newUser);
     }

    async findAll() {
        const user = await this.usersRepository.find()
        if (!user) throw new NotFoundException('User Not Found')

        return user
    }

    async findOne(id: number) {
        const user = await this.usersRepository.findOne({where: {id}})

        if (!user) throw new NotFoundException('User Not Found')

        return user
    }

    async update(id:number, updateUserDto: UpdateUserDto) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        Object.assign(user, updateUserDto);
        return await this.usersRepository.save(user);
    }

    async delete(id:number) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`)
        }
        return this.usersRepository.remove(user)
    }
}
