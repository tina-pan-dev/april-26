import { Cat, PouchSize } from './comms.types';

const POUCH_PRICES: Record<PouchSize, number> = {
  A: 55.5,
  B: 59.5,
  C: 62.75,
  D: 66.0,
  E: 69.0,
  F: 71.25,
};

export function getActiveCats(cats: Cat[]): Cat[] {
  return cats.filter((cat) => cat.subscriptionActive);
}

export function formatCatNames(names: string[]): string {
  if (names.length === 0) return '';
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  const last = names[names.length - 1];
  const rest = names.slice(0, -1).join(', ');
  return `${rest} and ${last}`;
}

export function calculateTotalPrice(cats: Cat[]): number {
  const activeCats = getActiveCats(cats);
  return activeCats.reduce(
    (total, cat) => total + POUCH_PRICES[cat.pouchSize],
    0,
  );
}
