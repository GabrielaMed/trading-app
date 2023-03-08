export interface ITicker {
  name: string;
  cotacao: number;
  bGraham?: number;
  bazin?: number;
  cagr: number;
  dy: number;
  growth: number;
  haveDate: string;
  lpa: number;
  dlebitida: number;
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
  plmedio?: number;
  lastQuantityRent1: number;
  lastQuantityRent2: number;
  lastQuantityRent3: number;
  rentAverage: number;
  valorInsider: number;
  liquidez: number;
  magicFormula?: number;
  pointsMF: number;
}

export interface IMagicFormula {
  pointsMF: number;
}
