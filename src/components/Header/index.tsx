import { Button, Form, Navbar, Offcanvas } from "react-bootstrap";
import { Box, Container } from "./styles";
import { Text } from "@ignite-ui/react";
import { TFields } from "../../utils/fields";
import { MdRefresh } from "react-icons/md";

interface HeaderProps {
  fields: TFields[];
  setFields: (fields: any) => void;
}

export const Header = ({ fields, setFields }: HeaderProps) => {
  const handleChangeDisplay = (displayName: string) => {
    let newFields;

    if (displayName === "Only B3" || displayName === "Only BDR") {
      newFields = fields.map((item) =>
        item.name === displayName
          ? { ...item, display: !item.display, filtered: !item.filtered }
          : item
      );
    } else {
      newFields = fields.map((item) =>
        item.name === displayName ? { ...item, display: !item.display } : item
      );
    }

    setFields(newFields);
  };

  return (
    <Container>
      <h1>Trading</h1>
      <div>
        <Navbar bg="light" expand={false} className="hamburguer-menu">
          <Navbar.Toggle />
          <Navbar.Offcanvas placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Filtros</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {fields.map((field, idx) => {
                return (
                  <Box key={idx}>
                    <Form.Check
                      checked={field.display}
                      onChange={(checked) => {
                        //console.log(field.display, ' - ', checked.target.checked);
                        handleChangeDisplay(field.name);
                      }}
                      aria-checked={field.display}
                    />
                    <Text style={{ color: "black" }}>{field.name}</Text>
                  </Box>
                );
              })}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Navbar>
        <Button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          <MdRefresh />
        </Button>
      </div>
    </Container>
  );
};
