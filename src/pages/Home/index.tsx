import { Table } from 'react-bootstrap';
import { Container } from './styles';
import { Header } from '../../components/Header';
import { fields } from '../../utils/fields';
import { useState, useEffect } from 'react';
import { fields as fieldsDefault } from '../../utils/fields';

export const Home = () => {
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
