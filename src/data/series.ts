// Series-level metadata. A project joins a series via `series: <id>` in its
// frontmatter; the projects index renders series members as one grouped arc.
export interface SeriesInfo {
  title: string;
  blurb: string;
}

export const seriesInfo: Record<string, SeriesInfo> = {
  'blackjack-rl': {
    title: 'Blackjack RL',
    blurb:
      'A four-part research arc: a measurement instrument that had to earn trust first, ' +
      'then one question asked three times with the ground truth progressively removed — ' +
      'can learning rediscover optimal play as a table, as a network, and finally as a ' +
      'bet-sizing rule whose signal is buried fifty-deep in per-hand noise?',
  },
};
