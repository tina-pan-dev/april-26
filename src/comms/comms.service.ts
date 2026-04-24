import { Injectable } from '@nestjs/common';

@Injectable()
export class CommsService {
  getNextDelivery(userId: string) {
    // Hardcoded placeholder response
    return {
      title: 'Your next delivery',
      message: 'Hey there! Your delivery is coming soon.',
      totalPrice: 100,
      freeGift: false,
    };
  }
}
