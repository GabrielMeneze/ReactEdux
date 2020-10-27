import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logo_2 from '../../assets/img/logo_2.png'

const Menu = () => {
    return (
        <div>
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand href="#home"><img style={{width : '100px'}} src={logo_2} alt="Logo Edux"/></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/" style={{color : '#04D94F'}} alt="Página inicial">Home</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Nav>
                    <Nav.Link href="/login" alt="Página de login" style={{color : '#F21D1D'}}>Login</Nav.Link>
                    <Nav.Link href="/cadastrar" alt="Página de cadastro de usuário" style={{color : '#F2CB05'}}>Cadastrar</Nav.Link>
                </Nav>
            </Navbar>
        </div>
    );
}

export default Menu;