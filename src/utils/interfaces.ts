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
  qttyRent1: number;
  qttyRent2: number;
  qttyRent3: number;
  rentAverage: number;
}

export interface IMagicFormula {
  tickerName: string;
  pointsMF: number;
}
