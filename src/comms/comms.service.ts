import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { User, NextDeliveryResponse } from './comms.types';

@Injectable()
export class CommsService {
  private users: User[];

  constructor() {
    const dataPath = path.join(__dirname, '../../data.json');
    const data = fs.readFileSync(dataPath, 'utf-8');
    this.users = JSON.parse(data);
  }

  getNextDelivery(userId: string): NextDeliveryResponse {
    const user = this.users.find(u => u.id === userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // Hardcoded placeholder response for now
    return {
      title: 'Your next delivery',
      message: 'Hey there! Your delivery is coming soon.',
      totalPrice: 100,
      freeGift: false,
    };
  }
}
