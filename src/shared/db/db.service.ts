import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class DbService extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super();
  }
  onModuleInit() {
    this.$connect();
  }
  onModuleDestroy() {
    this.$disconnect();
  }
}
