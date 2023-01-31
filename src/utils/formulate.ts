export const formulatePlMedio = (
  pl1: number,
  pl2: number,
  pl3: number,
  pl4: number
) => {
  const calc = (pl1 + pl2 + pl3 + pl4) / 4;
  return calc === 0 || Number.isNaN(calc) ? 0 : Math.round(calc);
};

export const formulateBGraham = (lpa: number, vpa: number) => {
  const calc = Math.sqrt(22.5 * lpa * vpa);
  return calc === 0 || Number.isNaN(calc) ? 0 : Math.round(calc);
};

export const formulateBazin = (cotacao: number, dy: number) => {
  const calc = cotacao * (dy / 100) * 17;
  return calc === 0 || Number.isNaN(calc) ? 0 : Math.round(calc);
};

export const formulateMSegGraham = (
  lpa: number,
  vpa: number,
  cotacao: number
) => {
  const calc = ((formulateBGraham(lpa, vpa) - cotacao) * 100) / cotacao / 100;
  return calc === 0 || Number.isNaN(calc) ? 0 : Math.round(calc);
};

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
