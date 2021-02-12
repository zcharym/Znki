import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateDeckDto } from '../dto/create-deck.dto';
import { ApiTags } from '@nestjs/swagger';
import { DeckService } from '../service/deck.service';
import { JWTGuard } from '../../auth/jwt.guard';
import { AuthUser } from '../../../shared/decorators/auth-user.decorator';
import { User } from '@prisma/client';

@ApiTags('Deck')
@Controller('deck')
@UseGuards(JWTGuard)
export class DeckController {
  constructor(private deckService: DeckService) {}

  @Post()
  async addDeck(@Body() body: CreateDeckDto, @AuthUser() user: User) {
    return this.deckService.createDeck(body, user.id);
  }

  @Get()
  async getDecks() {
    return this.deckService.list();
  }
}
