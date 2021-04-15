import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Container, FormControl, Nav, Navbar, NavDropdown, InputGroup, Col, Row, Dropdown, Badge } from "react-bootstrap";
import { actionLogout } from "../redux/actionCreater";
import { admin, user, vasyaPupkin } from "../redux/authReducer";

const MyLink = ({cart}) => {
  return <Link to="/cart" className="position-relative">
  <img src="https://img.icons8.com/cotton/50/000000/fast-cart.png"/>
  <Badge variant="light" className="position-absolute bottom-0 end-0">{cart.goods?.length || 0}</Badge>
</Link>
}

const CLink = connect(state => ({cart: state.cart}))(MyLink)

const UserOptions = ({state: {role}, logout}) => {

  role = role || (localStorage.token && JSON.parse(atob(localStorage.token.split('.')[1])).sub.role) || vasyaPupkin

return <>
{
  role === user ?
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic" as="span">
        <img src="https://img.icons8.com/cotton/50/000000/user-male--v1.png"/>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="/orders">Мои заказы</Dropdown.Item>
        <Dropdown.Item onClick={logout}>Выйти</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    :
    <Link to="/authorize">
      <img src="https://img.icons8.com/cotton/50/000000/user-male--v1.png"/>
    </Link>

}

</>
}

const CUserOptions = connect(state => ({state: state.auth}), {logout: actionLogout})(UserOptions)

const Header = () =>
<header>
  <Navbar bg="dark" expand="md" variant="dark">
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Container fluid>
      <Col>
        <Nav className="mr-auto">
          <Navbar.Brand>Super-Store</Navbar.Brand>
          <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
        </Nav>
      </Col>
      <Col xs={3} className="d-flex justify-content-around">
        <CLink/>
        <CUserOptions/>
      </Col>
    </Container>
  </Navbar.Collapse>
</Navbar> 
</header>

export const CHeader = connect(null, {logout: actionLogout})(Header)