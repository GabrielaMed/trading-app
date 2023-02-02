import { Table } from 'react-bootstrap';
import { Container } from './styles';
import { Header } from '../../components/Header';
import { useEffect, useState } from 'react';
import { fields as fieldsDefault } from '../../utils/fields';
import { IMagicFormula, ITicker } from '../../utils/interfaces';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../api/firebase';
import ReactLoading from 'react-loading';
import { colors } from '../../utils/colors';
import {
  formulateBGraham,
  formulateBazin,
  formulatePlMedio,
  formulateRentSign,
} from '../../utils/formulate';
import { MdOutlineCancel, MdOutlineCheckCircleOutline } from 'react-icons/md';
import { createMagicFormula } from '../../utils/magicFormula';

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(fieldsDefault);
  const [data, setData] = useState<ITicker[]>([]);
  const [magicFormulaData, setMagicFormulaData] = useState<IMagicFormula[]>([]);

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
    setMagicFormulaData(createMagicFormula(dataApi));
    setData([...dataApi]);
    // console.log(data);
    setLoading(false);
  };

  const handleOrderTicker = () => {
    const dataSorted = data.sort((a, b) =>
      a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase())
    );

    console.log(dataSorted);
    setData([...dataSorted]);
  };
  //console.log(data, '1');

  useEffect(() => {
    getData();
    //console.log(data, '11');
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
        <Table striped hover responsive className='homeTable'>
          <thead>
            <tr>
              <th
                onClick={() => handleOrderTicker()}
                style={{ cursor: 'pointer' }}
              >
                Ticker
              </th>
              {fields.map(
                (field, idx) => field.display && <th key={idx}>{field.name}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((ticker, idx) => (
              <tr key={idx}>
                <td>{ticker.name}</td>
                <td>{ticker.cotacao}</td>

                {fields.find((field) => field.name === 'B. Graham')
                  ?.display && (
                  <td
                    style={{
                      backgroundColor:
                        +formulateBGraham(ticker.lpa, ticker.vpa) <
                        ticker.cotacao
                          ? colors.lightYellow
                          : colors.lightGreen,
                    }}
                  >
                    {formulateBGraham(ticker.lpa, ticker.vpa)}
                  </td>
                )}

                {fields.find((field) => field.name === 'Bazin')?.display && (
                  <td
                    style={{
                      backgroundColor:
                        +formulateBazin(ticker.cotacao, ticker.dy) <
                        ticker.cotacao
                          ? colors.lightYellow
                          : colors.lightGreen,
                    }}
                  >
                    {formulateBazin(ticker.cotacao, ticker.dy)}
                  </td>
                )}
                {/* 
                {fields.find((field) => field.name === 'MSeg. Graham')
                  ?.display && (
                  <td>
                    {formulateMSegGraham(
                      ticker.lpa,
                      ticker.vpa,
                      ticker.cotacao
                    )}
                  </td>
                )} */}

                {fields.find((field) => field.name === 'CAGR')?.display && (
                  <td>{ticker.cagr}</td>
                )}

                {fields.find((field) => field.name === 'DY')?.display && (
                  <td>{ticker.dy}</td>
                )}

                {fields.find((field) => field.name === 'Growth')?.display && (
                  <td>{ticker.growth}</td>
                )}

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
                        ticker.debitOfEbitida < 3.5
                          ? colors.lightYellow
                          : colors.lightGreen,
                    }}
                  >
                    {ticker.debitOfEbitida}
                  </td>
                )}

                {fields.find((field) => field.name === 'Margem Liq.')
                  ?.display && (
                  <td
                    style={{
                      backgroundColor:
                        ticker.mliquida < 12
                          ? colors.lightYellow
                          : colors.lightGreen,
                    }}
                  >
                    {ticker.mliquida}
                  </td>
                )}

                {fields.find((field) => field.name === 'Payout')?.display && (
                  <td>{ticker.payout}</td>
                )}

                {fields.find((field) => field.name === 'PL Médio')?.display && (
                  <td
                    style={{
                      backgroundColor:
                        +formulatePlMedio(
                          +ticker.pl1,
                          +ticker.pl2,
                          +ticker.pl3,
                          +ticker.pl4
                        ) < ticker.pl
                          ? colors.lightYellow
                          : colors.lightGreen,
                    }}
                  >
                    {formulatePlMedio(
                      +ticker.pl1,
                      +ticker.pl2,
                      +ticker.pl3,
                      +ticker.pl4
                    )}
                  </td>
                )}

                {fields.find((field) => field.name === 'PL')?.display && (
                  <td>{ticker.pl}</td>
                )}

                {fields.find((field) => field.name === 'PVP')?.display && (
                  <td>{ticker.pvp}</td>
                )}

                {fields.find((field) => field.name === 'Sector')?.display && (
                  <td>{ticker.sector}</td>
                )}

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
                      ticker.qttyRent1,
                      ticker.qttyRent2,
                      ticker.qttyRent3,
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

                {fields.find((field) => field.name === 'Magic Formula')
                  ?.display && (
                  <td align='center'>
                    {magicFormulaData.findIndex(
                      (item) => item.tickerName === ticker.name
                    ) < 30 ? (
                      <MdOutlineCheckCircleOutline
                        color={colors.green}
                        size={24}
                      />
                    ) : (
                      <MdOutlineCancel color={colors.red} size={24} />
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};
