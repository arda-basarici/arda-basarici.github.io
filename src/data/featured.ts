// What the landing page features. Edit this list to change it — a series id
// features the whole arc as one unit; a project id features a single card.
export type FeaturedEntry = { kind: 'series'; id: string } | { kind: 'project'; id: string };

export const featured: FeaturedEntry[] = [
  { kind: 'series', id: 'blackjack-rl' },
  { kind: 'project', id: 'pathfinding' },
  { kind: 'project', id: 'steam-reviews' },
];
