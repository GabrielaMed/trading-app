import { Table } from 'react-bootstrap';
import { Container } from './styles';
import { Header } from '../../components/Header';
import { fields } from '../../utils/fields';

export const Home = () => {
  return (
    <Container>
      <Header />
      <Table striped hover>
        <thead>
          <tr>
            {fields.map((field, idx) => {
              return (
                <th
                  key={idx}
                  style={{
                    display: `${field.display === false ? 'none' : 'run-in'}`,
                  }}
                >
                  {field.name}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
    </Container>
  );
};
