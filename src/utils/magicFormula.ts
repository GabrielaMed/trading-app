import { ITicker } from './interfaces';

export const sortRoe = (data: any) => {
  return data.sort(
    (firstItem: { roe: number }, secondItem: { roe: number }) =>
      firstItem.roe - secondItem.roe
  );
};

export const sortPL = (data: any) => {
  return data.sort(
    (firstItem: { pl: number }, secondItem: { pl: number }) =>
      firstItem.pl - secondItem.pl
  );
};

export const sortMargemLiq = (data: any) => {
  const newData = data.map((ticker: { mliquida: string }) => {
    if (+ticker.mliquida > 99) ticker.mliquida = '10.00';
    return ticker;
  });

  return newData.sort(
    (firstItem: { mliquida: number }, secondItem: { mliquida: number }) =>
      firstItem.mliquida - secondItem.mliquida
  );
};

export const createMagicFormula = (data: any) => {
  const roeArray = sortRoe(data);
  const plArray = sortPL(data);
  const mLiquidaArray = sortMargemLiq(data);
  const magicFormula: any[] = [];

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

    const resultMF = roeIndex + plIndex + mLiquidaIndex;
    const tickerName = ticker.name;
    magicFormula.push({ tickerName, resultMF });
  });
  console.log(magicFormula.sort((a, b) => b.resultMF - a.resultMF));

  //const magicFormulaSorted = magicFormula.sort((a, b) => b.resultMF - a.resultMF)
};
