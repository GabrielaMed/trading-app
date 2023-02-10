export interface ITicker {
  name: string;
  cotacao: number;
  cagr: number;
  dy: number;
  growth: number;
  haveDate: string;
  lpa: number;
  debitOfEbitida: number;
  mliquida: number;
  payout: number;
  pl: number;
  pvp: number;
  sector: string;
  tagAlong: number;
  vpa: number;
  pl1: number;
  pl2: number;
  pl3: number;
  pl4: number;
  roe: number;
  lastQuantityRent1: number;
  lastQuantityRent2: number;
  lastQuantityRent3: number;
  rentAverage: number;
  valorInsider: number;
}

export interface IMagicFormula {
  tickerName: string;
  pointsMF: number;
}
