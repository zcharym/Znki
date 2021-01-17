import { Repository } from 'typeorm';

import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../../models/user.model';
import { AppException } from '../../shared/exceptions/app.exception';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  public async createUser(user: RegisterUserDto): Promise<void> {
    try {
      await this.userRepo.save(user);
    } catch (e) {
      Logger.error(e);
      throw new AppException();
    }
  }

  public async getUserById(id: number): Promise<User> {
    const user = this.userRepo.findOne({ id });
    if (!user) {
      throw new NotFoundException('User with this id does not exist');
    }
    return user;
  }

  public async validateUser(email: string, pwd: string): Promise<User> {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .where('LOWER(user.email) = LOWER(:email)', { email })
      .andWhere('user.pwd = :pwd', { pwd })
      .getOne();
    if (!user) {
      throw new ForbiddenException('forbidden');
    }
    return user;
  }

  public async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepo
      .createQueryBuilder('user')
      .where('LOWER(user.email) = LOWER(:email)', { email })
      .getOne();
  }
}
