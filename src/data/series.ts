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
      'A four-part research arc: build the measurement instrument, audit what tabular ' +
      'Monte-Carlo control can rediscover, test what neural generalization repairs and ' +
      'distorts, then ask whether an RL agent can learn Kelly bet-sizing from a signal ' +
      'buried in noise.',
  },
};
