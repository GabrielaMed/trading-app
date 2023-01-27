import { Table } from 'react-bootstrap';
import { Container, Header } from './styles';

export const Home = () => {
  return (
    <Container>
      <Header>
        <h1>Trading</h1>
      </Header>
      <Table striped hover>
        <thead>
          <tr>
            <th>TICKER</th>
            <th>COTAÇÃO</th>
            <th>B. Graham</th>
            <th>Bazin</th>
            <th>MSeg.Graham</th>
            <th>Cagr</th>
            <th>Dy</th>
            <th>Growth</th>
            <th>Have date</th>
            <th>Ipa</th>
            <th>D/ebitida</th>
            <th>Margem liquida</th>
            <th>Payout</th>
            <th>PL médio</th>
            <th>PL</th>
            <th>PVP</th>
            <th>Sector</th>
            <th>Tag along</th>
            <th>VPA</th>
            <th>PL 1</th>
            <th>PL 2</th>
            <th>PL 3</th>
            <th>PL 4</th>
            <th>Sinal aluguel</th>
            <th>ROE</th>
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
    </Container>
  );
};
