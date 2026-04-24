import {
  formatCatNames,
  calculateTotalPrice,
  getActiveCats,
} from './comms.utils';
import { Cat } from './comms.types';

describe('Comms Utils', () => {
  describe('formatCatNames', () => {
    it('should return empty string for no names', () => {
      expect(formatCatNames([])).toBe('');
    });

    it('should return single name', () => {
      expect(formatCatNames(['Whiskers'])).toBe('Whiskers');
    });

    it('should format two names with "and"', () => {
      expect(formatCatNames(['Whiskers', 'Fluffy'])).toBe(
        'Whiskers and Fluffy',
      );
    });

    it('should format three or more names with commas and "and"', () => {
      expect(formatCatNames(['Whiskers', 'Fluffy', 'Mittens'])).toBe(
        'Whiskers, Fluffy and Mittens',
      );
      expect(formatCatNames(['A', 'B', 'C', 'D'])).toBe('A, B, C and D');
    });
  });

  describe('getActiveCats', () => {
    it('should return only active cats', () => {
      const cats: Cat[] = [
        {
          name: 'Active',
          subscriptionActive: true,
          breed: 'Siamese',
          pouchSize: 'A',
        },
        {
          name: 'Inactive',
          subscriptionActive: false,
          breed: 'Persian',
          pouchSize: 'B',
        },
        {
          name: 'AlsoActive',
          subscriptionActive: true,
          breed: 'Maine Coon',
          pouchSize: 'C',
        },
      ];
      const active = getActiveCats(cats);
      expect(active).toHaveLength(2);
      expect(active.map((c) => c.name)).toEqual(['Active', 'AlsoActive']);
    });

    it('should return empty array if no active cats', () => {
      const cats: Cat[] = [
        {
          name: 'Inactive1',
          subscriptionActive: false,
          breed: 'Siamese',
          pouchSize: 'A',
        },
        {
          name: 'Inactive2',
          subscriptionActive: false,
          breed: 'Persian',
          pouchSize: 'B',
        },
      ];
      expect(getActiveCats(cats)).toHaveLength(0);
    });
  });

  describe('calculateTotalPrice', () => {
    it('should calculate price for active cats only', () => {
      const cats: Cat[] = [
        {
          name: 'ActiveA',
          subscriptionActive: true,
          breed: 'Siamese',
          pouchSize: 'A',
        }, // 55.50
        {
          name: 'InactiveB',
          subscriptionActive: false,
          breed: 'Persian',
          pouchSize: 'B',
        }, // 59.50 (should not count)
        {
          name: 'ActiveC',
          subscriptionActive: true,
          breed: 'Maine Coon',
          pouchSize: 'C',
        }, // 62.75
      ];
      expect(calculateTotalPrice(cats)).toBe(55.5 + 62.75);
    });

    it('should return 0 for no active cats', () => {
      const cats: Cat[] = [
        {
          name: 'Inactive',
          subscriptionActive: false,
          breed: 'Siamese',
          pouchSize: 'A',
        },
      ];
      expect(calculateTotalPrice(cats)).toBe(0);
    });

    it('should calculate correct prices for all pouch sizes', () => {
      const cats: Cat[] = [
        { name: 'A', subscriptionActive: true, breed: 'Test', pouchSize: 'A' }, // 55.50
        { name: 'B', subscriptionActive: true, breed: 'Test', pouchSize: 'B' }, // 59.50
        { name: 'C', subscriptionActive: true, breed: 'Test', pouchSize: 'C' }, // 62.75
        { name: 'D', subscriptionActive: true, breed: 'Test', pouchSize: 'D' }, // 66.00
        { name: 'E', subscriptionActive: true, breed: 'Test', pouchSize: 'E' }, // 69.00
        { name: 'F', subscriptionActive: true, breed: 'Test', pouchSize: 'F' }, // 71.25
      ];
      expect(calculateTotalPrice(cats)).toBe(
        55.5 + 59.5 + 62.75 + 66.0 + 69.0 + 71.25,
      );
    });
  });
});
