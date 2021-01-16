import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CardService } from '../service/card.service';
import { CreateCardDto } from '../dto/create-card.dto';

@ApiTags('Card')
@Controller('card')
export class CardController {
  constructor(private cardService: CardService) {}

  @Get()
  async getCards() {
    return this.cardService.list();
  }

  @Post()
  async addCard(@Body() body: CreateCardDto) {
    return this.cardService.addCard(body);
  }

  @Put()
  async updateCard() {
    return;
  }
}
