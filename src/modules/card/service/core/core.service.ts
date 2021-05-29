import { Injectable } from '@nestjs/common';
import { Card, CardStatusEnum } from '@prisma/client';
import { supermemo, SuperMemoGrade } from 'supermemo';
import dayjs from 'dayjs';
import { ReviewStatusEnum } from 'src/shared/consts/common.const';

@Injectable()
export class CoreService {
  /**
   * update card due date
   * @param card
   * @param statusEnum
   *
   */
  review(card: Card, statusEnum: ReviewStatusEnum): Card {
    const status = this.mapEnum(statusEnum);

    const { interval, repetition, efactor } = supermemo(
      {
        interval: card.interval,
        repetition: card.reviews,
        efactor: card.efactor,
      },
      status,
    );
    const due = dayjs(new Date())
      .add(interval, 'day')
      .toDate();

    return {
      ...card,
      due,
      interval,
      efactor,
      reviews: repetition,
      status:
        card.status === CardStatusEnum.NEW
          ? CardStatusEnum.LEARNING
          : card.status,
    };
  }

  private mapEnum(status: ReviewStatusEnum): SuperMemoGrade {
    let val: SuperMemoGrade = 0;
    switch (status) {
      case ReviewStatusEnum.UNKNOWN:
        val = 0;
        break;
      case ReviewStatusEnum.GOOD:
        val = 3;
        break;
      case ReviewStatusEnum.CLEAR:
        val = 5;
        break;
      default:
        break;
    }
    return val;
  }
}
