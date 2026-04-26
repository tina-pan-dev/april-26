import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { User, NextDeliveryResponse } from './comms.types';
import {
  getActiveCats,
  formatCatNames,
  calculateTotalPrice,
} from './comms.utils';

@Injectable()
export class CommsService {
  private users: User[];

  constructor() {
    const dataPath = path.join(process.cwd(), 'data.json');
    const data = fs.readFileSync(dataPath, 'utf-8');

    this.users = JSON.parse(data) as User[];
  }

  getNextDelivery(userId: string): NextDeliveryResponse {
    const user = this.users.find((u) => u.id === userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const activeCats = getActiveCats(user.cats);
    const formattedNames = formatCatNames(activeCats.map((cat) => cat.name));
    const totalPrice = Math.round(calculateTotalPrice(activeCats) * 100) / 100;
    const freeGift = totalPrice > 120;

    if (activeCats.length === 0) {
      return {
        title: 'Your next delivery',
        message: `Hey ${user.firstName}! You currently have no active cat food subscriptions.`,
        totalPrice,
        freeGift,
      };
    }

    return {
      title: `Your next delivery for ${formattedNames}`,
      message: `Hey ${user.firstName}! In two days' time, we'll be charging you for your next order for ${formattedNames}'s fresh food.`,
      totalPrice,
      freeGift,
    };
  }
}
