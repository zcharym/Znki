import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CardService } from '../service/card.service';
import { JWTGuard } from '../../auth/jwt.guard';
import { CreateCardDto } from '../dto/create-card.dto';
import { AuthUser } from 'src/shared/decorators';
import { CardListDto } from '../dto/card-list.dto';
import { Query } from '@nestjs/common';

/**
 * TODO use guard to specific module
 * https://stackoverflow.com/questions/56397944/how-to-provide-a-guard-for-a-specific-module-in-nest-js
 */
@UseGuards(JWTGuard)
@ApiTags('Card')
@Controller('card')
export class CardController {
  constructor(private cardService: CardService) {}

  @Post()
  @ApiOperation({ summary: 'get all cards' })
  async getCards(@Body() cardList: CardListDto) {
    return this.cardService.list(cardList);
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
    return this.cardService.getCardById(cardId);
  }

  @Post('/add')
  async addCard(@Body() body: CreateCardDto) {
    return this.cardService.addCard(body);
  }

  @Put()
  async updateCard() {
    return;
  }
}
