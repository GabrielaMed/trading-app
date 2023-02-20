import { ITicker } from './interfaces';

export const formulateBGraham = (tickers: ITicker[]) => {
  return tickers.map((ticker) => {
    const calc = Math.sqrt(22.5 * ticker.lpa * ticker.vpa);
    return {
      ...ticker,
      bGraham: calc === 0 || Number.isNaN(calc) ? 0 : +calc.toFixed(2),
    };
  });
};

export const formulateBazin = (tickers: ITicker[]) => {
  return tickers.map((ticker) => {
    const calc = ticker.cotacao * (ticker.dy / 100) * 17;
    return {
      ...ticker,
      bazin: calc === 0 || Number.isNaN(calc) ? 0 : +calc.toFixed(2),
    };
  });
};

export const calcAvgPL = (tickers: ITicker[]) => {
  return tickers.map((ticker) => {
    let fator = ticker?.pl1 ? 1 : 0;
    fator = fator + ticker?.pl2 ? 1 : 0;
    fator = fator + ticker?.pl3 ? 1 : 0;
    fator = fator + ticker?.pl4 ? 1 : 0;

    return {
      ...ticker,
      plmedio:
        (ticker?.pl1 ||
          0 + ticker?.pl2 ||
          0 + ticker?.pl3 ||
          0 + ticker?.pl4 ||
          0) / fator,
    };
  });
};

// export const formulateMSegGraham = (
//   lpa: number,
//   vpa: number,
//   cotacao: number
// ) => {
//   const calc = ((formulateBGraham(lpa, vpa) - cotacao) * 100) / cotacao / 100;
//   return calc === 0 || Number.isNaN(calc) ? 0 : Math.round(calc);
// };

export const formulateRentSign = (
  lastQuantityRent1: number,
  lastQuantityRent2: number,
  lastQuantityRent3: number,
  rentAverage: number
) => {
  const signal =
    lastQuantityRent1 < rentAverage ||
    lastQuantityRent2 < rentAverage ||
    lastQuantityRent3 < rentAverage;
  return signal;
};
