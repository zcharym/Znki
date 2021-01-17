import { JWTGuard } from 'src/modules/auth/jwt.guard';

import {
    Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateCardDto } from '../dto/create-card.dto';
import { CardService } from '../service/card.service';

@ApiTags('Card')
@Controller('card')
export class CardController {
  constructor(private cardService: CardService) {}

  @Get()
  @UseGuards(JWTGuard)
  @ApiOperation({ summary: 'get all cards' })
  async getCards() {
    return this.cardService.list();
  }

  @Get(':card_id')
  @ApiOperation({
    summary: 'get card info by card id',
    description: 'version 0.1',
  })
  async getCardDetailById(
    @Param(
      'card_id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    cardId: number,
  ) {
    return this.cardService.getCardDetailById(cardId);
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
