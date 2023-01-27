import { Form, Navbar, Offcanvas } from 'react-bootstrap';
import { Box, Container } from './styles';
import { Text } from '@ignite-ui/react';
import { fields as fieldsDefault } from '../../utils/fields';
import { useState } from 'react';
export const Header = () => {
  const [fields, setFields] = useState(fieldsDefault);
  return (
    <Container>
      <h1>Trading</h1>

      <Navbar bg='light' expand={false} className='hamburguer-menu'>
        <Navbar.Toggle />
        <Navbar.Offcanvas placement='end'>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filtros</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {fields.map((field, idx) => {
              return (
                <Box key={idx}>
                  <Form.Check
                    onChange={(checked) => {
                      //console.log(field.display, ' - ', checked.target.checked);
                      setFields([...fields]);
                      console.log(setFields([...fields]));
                    }}
                    aria-checked={field.display}
                  />
                  <Text style={{ color: 'black' }}>{field.name}</Text>
                </Box>
              );
            })}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>
    </Container>
  );
};
