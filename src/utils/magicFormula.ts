import { IMagicFormula, ITicker } from './interfaces';

export const sortRoe = (data: any) => {
  const result = data
    .filter((ticker: { roe: number }) => ticker.roe !== undefined)
    .sort((a: { roe: number }, b: { roe: number }) => a.roe - b.roe);

  return result;
};

export const sortPL = (data: any) => {
  const result = data
    .filter(
      (ticker: { pl: number }) => ticker.pl !== undefined && ticker.pl > 0
    )
    .sort((a: { pl: number }, b: { pl: number }) => a.pl - b.pl);

  return result;
};

export const sortMargemLiq = (data: any) => {
  const newData = data.map((ticker: { mliquida: string }) => {
    if (+ticker.mliquida > 99) ticker.mliquida = '10.00';
    return ticker;
  });

  return newData.sort(
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
  //console.log();

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
