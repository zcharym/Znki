import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CardService } from '../service/card.service';
import { UniRes } from '../../../shared/class/uni-res.class';

@ApiTags('Card')
@Controller('card')
export class CardController {
  constructor(private cardService: CardService) {}

  @Get()
  async getCards() {
    return 'UniRes.created();';
  }
}
