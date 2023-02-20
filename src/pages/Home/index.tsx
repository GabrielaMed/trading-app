import { Table } from 'react-bootstrap';
import { Container, TableContainer } from './styles';
import { Header } from '../../components/Header';
import { useEffect, useState } from 'react';
import { fieldNames, fields as fieldsDefault } from '../../utils/fields';
import { IMagicFormula, ITicker } from '../../utils/interfaces';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../api/firebase';
import ReactLoading from 'react-loading';
import { colors } from '../../utils/colors';
import {
  calcAvgPL,
  formulateBGraham,
  formulateBazin,
  formulateRentSign,
} from '../../utils/formulate';
import { MdOutlineCancel, MdOutlineCheckCircleOutline } from 'react-icons/md';
import { createMagicFormula } from '../../utils/magicFormula';

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState([...fieldsDefault]);
  const [data, setData] = useState<ITicker[]>([]);

  useEffect(() => {
    const dataFromStorage = localStorage.getItem('data');
    if (dataFromStorage) {
      const filters = fields.filter((field) => field.filtered);

      let newData = [...JSON.parse(dataFromStorage)];
      filters.forEach((field) => {
        switch (field.name) {
          case fieldNames.margemliquida:
            newData = newData.filter((ticker) => ticker.mliquida > 10);
            break;
          case fieldNames.pl || fieldNames.plmedio:
            newData = newData.filter(
              (ticker) => ticker.pl > 0 && ticker.pl <= ticker?.plmedio
            );
            break;
          case fieldNames.insider:
            newData = newData.filter((ticker) => ticker.valorInsider >= 0);
            break;
          case fieldNames.bgraham:
            newData = newData.filter(
              (ticker) => ticker.bGraham > 0 && ticker.bGraham >= ticker.cotacao
            );
            break;
          case fieldNames.bazin:
            newData = newData.filter(
              (ticker) => ticker.bazin > 0 && ticker.bazin >= ticker.cotacao
            );
            break;
          case fieldNames.liquidez:
            newData = newData.filter((ticker) => ticker.liquidez >= 0.9);
            break;
          case fieldNames.insider:
            newData = newData.filter(
              (ticker) => ticker.insider === 0 || ticker.insider === null
            );
            break;
          case fieldNames.magicformula:
            newData = newData.sort((ticker) => ticker.magicFormula);
            break;
          default:
            break;
        }
      });
      setData([...newData]);

      console.log('-->', newData);
    }
  }, [fields]);

  const toggleFilter = (fieldName: string) => {
    const newFields = fields.map((field) =>
      field.name === fieldName ? { ...field, filtered: !field.filtered } : field
    );
    setFields([...newFields]);
  };

  const getData = async () => {
    setLoading(true);
    const dataCol = collection(db, 'tickers');
    const dataSnapshot = await getDocs(dataCol);
    const dataApi: ITicker[] = [];

    dataSnapshot.docs.forEach((item) => {
      const itemData = item.data();
      dataApi.push(itemData as ITicker);
    });

    //createMagicFormula(dataApi);
    let newDataParsed;
    newDataParsed = calcAvgPL(dataApi);
    newDataParsed = formulateBGraham(newDataParsed);
    newDataParsed = formulateBazin(newDataParsed);
    newDataParsed = createMagicFormula(newDataParsed).map((ticker, idx) => ({
      ...ticker,
      magicFormula: idx,
    }));

    setData([...newDataParsed]);
    localStorage.setItem('data', JSON.stringify(newDataParsed));
    setLoading(false);
  };

  const handleOrderTicker = () => {
    const dataSorted = data.sort((a, b) =>
      a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase())
    );

    setData([...dataSorted]);
  };

  useEffect(() => {
    const getItemVal = localStorage.getItem('data');
    if (getItemVal) {
      setData(JSON.parse(getItemVal));
    } else {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Header fields={fields} setFields={setFields} />
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ReactLoading
            type={'cylon'}
            color={colors.lightGreen}
            height={'150px'}
            width={'150px'}
          />
        </div>
      )}
      {!loading && (
        <TableContainer>
          <Table striped hover className='homeTable'>
            <thead>
              <tr>
                <th
                  onClick={() => handleOrderTicker()}
                  style={{ cursor: 'pointer' }}
                  scope='col'
                >
                  Ticker
                </th>
                {fields.map(
                  (field, idx) =>
                    field.display && (
                      <th
                        style={{ cursor: 'pointer' }}
                        onClick={() => toggleFilter(field.name)}
                        key={idx}
                      >
                        {field.name}
                      </th>
                    )
                )}
              </tr>
            </thead>
            <tbody>
              {data
                .filter((ticker) => ticker.cotacao !== undefined)
                .map((ticker, idx) => (
                  <tr key={idx}>
                    <td>
                      {' '}
                      <a
                        href={`https://statusinvest.com.br/acoes/${ticker.name}`}
                        target='_blank'
                        style={{ textDecoration: 'none' }}
                      >
                        {ticker.name}
                      </a>
                    </td>
                    <td>{ticker.cotacao}</td>

                    {fields.find((field) => field.name === 'B. Graham')
                      ?.display && (
                      <td
                        style={{
                          backgroundColor:
                            ticker?.bGraham! > ticker.cotacao
                              ? colors.lightGreen
                              : colors.lightYellow,
                        }}
                      >
                        {ticker?.bGraham}
                      </td>
                    )}

                    {fields.find((field) => field.name === 'Bazin')
                      ?.display && (
                      <td
                        style={{
                          backgroundColor:
                            ticker?.bazin! > ticker.cotacao
                              ? colors.lightGreen
                              : colors.lightYellow,
                        }}
                      >
                        {ticker?.bazin}
                      </td>
                    )}

                    {fields.find((field) => field.name === 'CAGR')?.display && (
                      <td>{ticker.cagr}</td>
                    )}

                    {fields.find((field) => field.name === 'DY')?.display && (
                      <td>{ticker.dy}</td>
                    )}

                    {fields.find((field) => field.name === 'Growth')
                      ?.display && <td>{ticker.growth}</td>}

                    {fields.find((field) => field.name === 'Have Date')
                      ?.display && <td>{ticker.haveDate}</td>}

                    {fields.find((field) => field.name === 'LPA')?.display && (
                      <td>{ticker.lpa}</td>
                    )}

                    {fields.find((field) => field.name === 'D/ebitida')
                      ?.display && (
                      <td
                        style={{
                          backgroundColor:
                            ticker?.dlebitida < 3.6
                              ? colors.lightGreen
                              : 'white',
                        }}
                      >
                        {ticker.dlebitida}
                      </td>
                    )}

                    {fields.find(
                      (field) => field.name === fieldNames.margemliquida
                    )?.display && (
                      <td
                        style={{
                          backgroundColor:
                            ticker.mliquida > 12
                              ? colors.lightGreen
                              : colors.lightYellow,
                        }}
                      >
                        {ticker.mliquida}
                      </td>
                    )}

                    {fields.find((field) => field.name === 'Payout')
                      ?.display && <td>{ticker.payout}</td>}

                    {fields.find((field) => field.name === 'PL')?.display && (
                      <td
                        style={{
                          backgroundColor: !ticker?.plmedio
                            ? ''
                            : ticker?.plmedio > ticker.pl
                            ? colors.lightGreen
                            : '',
                        }}
                      >
                        {ticker.pl}
                      </td>
                    )}
                    {fields.find((field) => field.name === 'PL Médio')
                      ?.display && <td>{ticker?.plmedio || 0}</td>}

                    {fields.find((field) => field.name === 'PVP')?.display && (
                      <td>{ticker.pvp}</td>
                    )}

                    {fields.find((field) => field.name === fieldNames.sector)
                      ?.display && <td>{ticker.sector}</td>}

                    {fields.find((field) => field.name === 'Tag Along')
                      ?.display && <td>{ticker.tagAlong}</td>}

                    {fields.find((field) => field.name === 'VPA')?.display && (
                      <td>{ticker.vpa}</td>
                    )}

                    {fields.find((field) => field.name === 'PL 1')?.display && (
                      <td>{!ticker.pl1 ? '0.00' : ticker.pl1}</td>
                    )}

                    {fields.find((field) => field.name === 'PL 2')?.display && (
                      <td>{!ticker.pl2 ? '0.00' : ticker.pl2}</td>
                    )}

                    {fields.find((field) => field.name === 'PL 3')?.display && (
                      <td>{!ticker.pl3 ? '0.00' : ticker.pl3}</td>
                    )}

                    {fields.find((field) => field.name === 'PL 4')?.display && (
                      <td>{!ticker.pl4 ? '0.00' : ticker.pl4}</td>
                    )}

                    {fields.find((field) => field.name === 'ROE')?.display && (
                      <td>{ticker.roe}</td>
                    )}
                    {fields.find((field) => field.name === 'Sinal Aluguel')
                      ?.display && (
                      <td align='center'>
                        {formulateRentSign(
                          ticker.lastQuantityRent1,
                          ticker.lastQuantityRent2,
                          ticker.lastQuantityRent3,
                          ticker.rentAverage
                        ) ? (
                          <MdOutlineCheckCircleOutline
                            color={colors.green}
                            size={24}
                          />
                        ) : (
                          <MdOutlineCancel color={colors.red} size={24} />
                        )}
                      </td>
                    )}

                    {fields.find(
                      (field) => field.name === fieldNames.magicformula
                    )?.display && (
                      <td
                        align='center'
                        style={{
                          backgroundColor:
                            ticker?.magicFormula! < 50 ? colors.lightGreen : '',
                        }}
                      >
                        {ticker.magicFormula}°
                      </td>
                    )}
                    {fields.find((field) => field.name === 'Insider')
                      ?.display && (
                      <td style={{ textAlign: 'end' }}>
                        {!ticker.pl4 ? '0.00' : ticker?.valorInsider}
                      </td>
                    )}
                    {fields.find((field) => field.name === 'Liquidez')
                      ?.display && (
                      <td style={{ textAlign: 'end' }}>{ticker.liquidez}</td>
                    )}
                  </tr>
                ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};
