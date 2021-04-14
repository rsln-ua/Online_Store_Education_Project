import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Container, FormControl, Nav, Navbar, NavDropdown, InputGroup, Col, Row, Dropdown, Badge } from "react-bootstrap";
import { actionLogout } from "../redux/actionCreater";
import { admin, user } from "../redux/authReducer";

const Header = ({logout}) =>
<header>
  <Navbar bg="dark" expand="md" variant="dark">
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Container fluid>
      <Col className="d-flex justify-content-around">

      <Nav className="mr-auto">
          <Navbar.Brand>Super-Store</Navbar.Brand>
          <Nav.Link as={Link} to="/admin">Заказы</Nav.Link>
          <Nav.Link as={Link} to="/admin/categories">Категории</Nav.Link>
          <Nav.Link as={Link} to="/admin/addGood">Добавить товар</Nav.Link>
          <Nav.Link as={Link} to="/admin/goods">Товары</Nav.Link>
          <Nav.Link as={Link} to="/admin/registerAdmin">Регистрировать админа</Nav.Link>
        </Nav>

        <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" as="span">
                <img src="https://img.icons8.com/cotton/50/000000/user-male--v1.png"/>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={logout}>Выйти</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Container>
  </Navbar.Collapse>
</Navbar> 
</header>

export const AdminHeader = connect(null, {logout: actionLogout})(Header)