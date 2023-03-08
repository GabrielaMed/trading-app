import { IMagicFormula, ITicker } from './interfaces';

const sortRoe = (data: any) => {
  const result = data
    .filter((ticker: { name: string }) => !ticker.name.includes('34'))
    .map((ticker: { roe: number }) =>
      ticker.roe === undefined ? { ...ticker, roe: 0.0 } : ticker
    )
    .sort((a: { roe: number }, b: { roe: number }) => a.roe - b.roe);

  return result;
};

const sortPL = (data: any) => {
  const result = data
    .filter((ticker: { name: string }) => !ticker.name.includes('34'))
    .map((ticker: { pl: number }) =>
      ticker.pl === undefined || ticker.pl < 0 ? { ...ticker, pl: 999 } : ticker
    )
    .sort((a: { pl: number }, b: { pl: number }) => b.pl - a.pl);

  return result;
};

const sortMargemLiq = (data: any) => {
  return data
    .filter((ticker: { name: string }) => !ticker.name.includes('34'))
    .map((ticker: { mliquida: number }) =>
      ticker.mliquida > 99 || !ticker?.mliquida
        ? { ...ticker, mliquida: 10 }
        : ticker
    )
    .sort(
      (a: { mliquida: number }, b: { mliquida: number }) =>
        a.mliquida - b.mliquida
    );
};

const sortLiquidez = (data: any) => {
  const result = data
    .filter((ticker: { name: string }) => !ticker.name.includes('34'))
    .map((ticker: { liquidez: number }) =>
      ticker.liquidez === undefined ? { ...ticker, liquidez: 0.0 } : ticker
    )
    .sort(
      (a: { liquidez: number }, b: { liquidez: number }) =>
        a.liquidez - b.liquidez
    );

  return result;
};

export const createMagicFormula = (tickers: ITicker[]) => {
  let magicFormula: ITicker[] = [];
  tickers.map((ticker) => {
    const roeArray = sortRoe(tickers);
    const plArray = sortPL(tickers);
    const mLiquidaArray = sortMargemLiq(tickers);
    const liquidezArray = sortLiquidez(tickers);

    const roeIndex = roeArray.findIndex(
      (item: { name: string }) => item.name === ticker.name
    );
    const plIndex = plArray.findIndex(
      (item: { name: string }) => item.name === ticker.name
    );
    const mLiquidaIndex =
      mLiquidaArray.findIndex(
        (item: { name: string }) => item.name === ticker.name
      ) * 0.5;

    const liquidezIndex =
      liquidezArray.findIndex(
        (item: { name: string }) => item.name === ticker.name
      ) * 0.5;

    const pointsMF = roeIndex + plIndex + mLiquidaIndex + liquidezIndex;
    const tickerName = ticker.name;
    magicFormula.push({ ...ticker, pointsMF });

    // console.log(
    //   'mf',
    //   magicFormula.sort((a, b) => b.pointsMF - a.pointsMF)
    // );
  });

  const magicFormulaSorted = magicFormula.sort(
    (a, b) => b.pointsMF - a.pointsMF
  );

  return magicFormulaSorted;
};
