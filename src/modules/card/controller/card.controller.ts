import { Controller, Get, HttpException, HttpStatus, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CardService } from '../service/card.service';

@ApiTags('Card')
@Controller('card')
export class CardController {
  constructor(private cardService: CardService) {}

  @Get()
  async getCards() {
    return 'UniRes.created();';
  }

  @Post()
  async addCard() {
    throw new HttpException(
      'Method not implement yet.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Put()
  async updateCard() {
    return;
  }
}
