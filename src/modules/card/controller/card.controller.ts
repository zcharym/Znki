import {
  Body,
  Controller,
  Delete,
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
import { CardListDto } from '../dto/card-list.dto';
import { ReviewCardDto } from '../dto/review-card.dto';
import { CommonIdSetDto } from 'src/shared/dto/common.dto';
import { UpdateCardDto } from '../dto/update-card.dto';
import { RetrieveReviewCardDto } from '../dto/query-review-cards.dto';

/**
 * TODO use guard to specific module
 * https://stackoverflow.com/questions/56397944/how-to-provide-a-guard-for-a-specific-module-in-nest-js
 */
@UseGuards(JWTGuard)
@ApiTags('Card')
@Controller('card')
export class CardController {
  constructor(private cardService: CardService) {}

  @Put()
  @ApiOperation({
    summary: 'to update card info',
    description: 'version 0.1',
  })
  async updateCard(@Body() body: UpdateCardDto) {
    return this.cardService.updateCard(body);
  }

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
  @ApiOperation({
    summary: 'to add card',
    description: 'version 0.1',
  })
  async addCard(@Body() body: CreateCardDto) {
    return this.cardService.addCard(body);
  }

  @Post('/retrieve')
  @ApiOperation({
    summary: 'retrieve cards to review',
    description: 'version 0.1',
  })
  async getReviewCards(@Body() body: RetrieveReviewCardDto) {
    return this.cardService.getReviewCards(body.deckId, body.length);
  }

  @Post('/review')
  @ApiOperation({
    summary: 'to review card',
    description: 'version 0.1',
  })
  async reviewCard(@Body() body: ReviewCardDto) {
    return this.cardService.reviewCard(body.cardId, body.status);
  }

  @Delete()
  @ApiOperation({
    summary: 'delete cards',
    description: 'version 0.1',
  })
  async deleteCards(@Body() body: CommonIdSetDto) {
    return this.cardService.deleteCard(body.ids);
  }
}
