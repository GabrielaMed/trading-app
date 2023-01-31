import { Table } from 'react-bootstrap';
import { Container } from './styles';
import { Header } from '../../components/Header';
import { useEffect, useState } from 'react';
import { fields as fieldsDefault } from '../../utils/fields';
import { ITicker } from '../../utils/interfaces';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../api/firebase';
import ReactLoading from 'react-loading';
import { colors } from '../../utils/colors';
import {
  formulateBGraham,
  formulateBazin,
  formulateMSegGraham,
  formulatePlMedio,
} from '../../utils/formulate';

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(fieldsDefault);
  const [data, setData] = useState<ITicker[]>([]);

  const getData = async () => {
    setLoading(true);
    const dataSnapshot = await getDocs(collection(db, 'tickers'));
    const dataApi: ITicker[] = [];

    dataSnapshot.docs.forEach((item) => {
      const itemData = item.data();
      dataApi.push(itemData as ITicker);
    });

    setData([...dataApi]);
    // console.log(data);
    setLoading(false);
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
        <Table striped hover>
          <thead>
            <tr>
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
                <td>{formulateBGraham(ticker.lpa, ticker.vpa)}</td>
                <td>{formulateBazin(ticker.cotacao, ticker.dy)}</td>
                <td>
                  {formulateMSegGraham(ticker.lpa, ticker.vpa, ticker.cotacao)}
                </td>
                <td>{ticker.cagr}</td>
                <td>{ticker.dy}</td>
                <td>{ticker.growth}</td>
                <td>{ticker.haveDate}</td>
                <td>{ticker.lpa}</td>
                <td>{ticker.debitOfEbitida}</td>
                <td>{ticker.mliquida}</td>
                <td>{ticker.payout}</td>
                <td>
                  {formulatePlMedio(
                    +ticker.pl1,
                    +ticker.pl2,
                    +ticker.pl3,
                    +ticker.pl4
                  )}
                </td>
                <td>{ticker.pl}</td>
                <td>{ticker.pvp}</td>
                <td>{ticker.sector}</td>
                <td>{ticker.tagAlong}</td>
                <td>{ticker.vpa}</td>
                <td>{!ticker.pl1 ? '0.00' : ticker.pl1}</td>
                <td>{!ticker.pl2 ? '0.00' : ticker.pl2}</td>
                <td>{!ticker.pl3 ? '0.00' : ticker.pl3}</td>
                <td>{!ticker.pl4 ? '0.00' : ticker.pl4}</td>
                <td></td>
                <td>{ticker.roe}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};
