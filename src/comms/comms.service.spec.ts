import { Test, TestingModule } from '@nestjs/testing';
import { CommsService } from './comms.service';
import { User } from './comms.types';

const mockUsers: User[] = [
  {
    id: 'test-user',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    cats: [
      {
        name: 'ActiveCat',
        subscriptionActive: true,
        breed: 'Siamese',
        pouchSize: 'C',
      }, // 62.75
      {
        name: 'InactiveCat',
        subscriptionActive: false,
        breed: 'Persian',
        pouchSize: 'F',
      }, // 71.25 (not counted)
    ],
  },
  {
    id: 'high-price-user',
    firstName: 'High',
    lastName: 'Price',
    email: 'high@example.com',
    cats: [
      {
        name: 'ExpensiveCat',
        subscriptionActive: true,
        breed: 'Maine Coon',
        pouchSize: 'F',
      }, // 71.25
      {
        name: 'AnotherCat',
        subscriptionActive: true,
        breed: 'Siamese',
        pouchSize: 'F',
      }, // 71.25, total 142.50 > 120
    ],
  },
  {
    id: 'no-active-user',
    firstName: 'No',
    lastName: 'Active',
    email: 'no@example.com',
    cats: [
      {
        name: 'InactiveCat',
        subscriptionActive: false,
        breed: 'Persian',
        pouchSize: 'A',
      },
    ],
  },
];

describe('CommsService', () => {
  let service: CommsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommsService],
    }).compile();

    service = module.get<CommsService>(CommsService);

    // Mock the data loading
    (service as any).users = mockUsers;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getNextDelivery', () => {
    it('should throw NotFoundException for unknown user', () => {
      expect(() => service.getNextDelivery('unknown')).toThrow(
        'User not found',
      );
    });

    it('should return correct response for user with active cats', () => {
      const result = service.getNextDelivery('test-user');
      expect(result.title).toBe('Your next delivery for ActiveCat');
      expect(result.message).toBe(
        "Hey Test! In two days' time, we'll be charging you for your next order for ActiveCat's fresh food.",
      );
      expect(result.totalPrice).toBe(62.75);
      expect(result.freeGift).toBe(false); // 62.75 < 120
    });

    it('should set freeGift to true when totalPrice > 120', () => {
      const result = service.getNextDelivery('high-price-user');
      expect(result.totalPrice).toBe(142.5);
      expect(result.freeGift).toBe(true);
    });

    it('should handle users with no active cats', () => {
      const result = service.getNextDelivery('no-active-user');
      expect(result.title).toBe('Your next delivery');
      expect(result.message).toBe(
        'Hey No! You currently have no active cat food subscriptions.',
      );
      expect(result.totalPrice).toBe(0);
      expect(result.freeGift).toBe(false);
    });
  });
});
