export enum Category {
  TREND = 'Trend / Pullback',
  REVERSAL = 'Reversal',
  PATTERN = 'Pattern / Range',
  BREAKOUT = 'Breakout / Failure',
}

export enum Sentiment {
  BULLISH = 'Bullish',
  BEARISH = 'Bearish',
  NEUTRAL = 'Neutral/Context Dependent'
}

export interface Term {
  id: string;
  acronym: string;
  fullName: string;
  category: Category;
  concept: string;
  logic: string;
  strategy: string;
  example: string;
  sentiment: Sentiment;
  highlight?: boolean; // For key concepts like Wedge
}
