import { Table } from 'react-bootstrap';
import { Container } from './styles';
import { Header } from '../../components/Header';
import { useState } from 'react';
import { fields as fieldsDefault } from '../../utils/fields';
import { ITicker } from '../../utils/interfaces';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../api/firebase';

interface Props {
  dataApi: ITicker[];
}

export const Home = ({ dataApi }: Props) => {
  const [fields, setFields] = useState(fieldsDefault);

  return (
    <Container>
      <Header fields={fields} setFields={setFields} />
      <Table striped hover>
        <thead>
          <tr>
            {fields.map(
              (field, idx) => field.display && <th key={idx}>{field.name}</th>
            )}
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
    </Container>
  );
};

async function getData() {
  const data = await getDocs(collection(db, 'tickers'));
  const dataApi: ITicker[] = [];

  data.forEach((item) => {
    const itemData = item.data();
    dataApi.push(itemData as ITicker);
  });

  return dataApi;
}
