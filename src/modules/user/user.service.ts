import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { AppException } from '../../shared/exceptions/app.exception';
import { RegisterUserDto } from './dto/register-user.dto';
import { DbService } from 'src/shared/db/db.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  public async createUser(user: RegisterUserDto): Promise<void> {
    try {
      await this.db.user.create({
        data: user,
      });
    } catch (e) {
      Logger.error(e);
      throw new AppException();
    }
  }

  public async getUserById(id: number): Promise<User> {
    const user = this.db.user.findFirst({ where: { id } });
    if (!user) {
      throw new NotFoundException('AuthUser with this id does not exist');
    }
    return user;
  }

  public async validateUser(email: string, pwd: string): Promise<User> {
    const user = await this.db.user.findFirst({
      where: {
        email,
        pwd,
      },
    });
    if (!user) {
      throw new ForbiddenException('forbidden');
    }
    return user;
  }

  public async findOneByEmail(email: string): Promise<User | undefined> {
    return this.db.user.findFirst({
      where: {
        email: {
          contains: email,
        },
      },
    });
  }
}
