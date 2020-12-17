import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group, User } from '../../model';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { AppException } from '../../shared/exceptions/app.exception';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {
  }

  // public async findAll(): Promise<User[]> {
  // }

  public async createUser(user: CreateUserDto): Promise<void> {
    try {
      await this.userRepo.save(user);
    } catch (e) {
      Logger.error(e);
      throw new AppException();
    }
  }

  public async getGroupsByUserId(userId: string): Promise<Group[]> {
    return undefined;
  }

}
