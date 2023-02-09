import { IMagicFormula, ITicker } from './interfaces';

export const sortRoe = (data: any) => {
  const result = data
    .map((ticker: { roe: number }) =>
      ticker.roe === undefined ? { ...ticker, roe: 0.0 } : ticker
    )
    .sort((a: { roe: number }, b: { roe: number }) => a.roe - b.roe);

  return result;
};

export const sortPL = (data: any) => {
  const result = data
    .map((ticker: { pl: number }) =>
      ticker.pl === undefined || ticker.pl < 0 ? { ...ticker, pl: 999 } : ticker
    )
    .sort((a: { pl: number }, b: { pl: number }) => b.pl - a.pl);

  return result;
};

export const sortMargemLiq = (data: any) => {
  return data
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

export const createMagicFormula = (data: any) => {
  const roeArray = sortRoe(data);
  const plArray = sortPL(data);
  const mLiquidaArray = sortMargemLiq(data);
  const magicFormula: IMagicFormula[] = [];

  console.log('pl', plArray);
  console.log('mliq', mLiquidaArray);
  console.log('roe', roeArray);

  data.forEach((ticker: { name: string }) => {
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

    const pointsMF = roeIndex + plIndex + mLiquidaIndex;
    const tickerName = ticker.name;
    magicFormula.push({ tickerName, pointsMF });
  });
  //console.log(magicFormula.sort((a, b) => b.pointsMF - a.pointsMF));

  const magicFormulaSorted = magicFormula.sort(
    (a, b) => b.pointsMF - a.pointsMF
  );
  return magicFormulaSorted;
};
