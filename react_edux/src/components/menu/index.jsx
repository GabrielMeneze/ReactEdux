import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logoBranco from '../../assets/img/logoBranco.png'

const Menu = () => {
    return (
        <div>
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand href="/"><img style={{ width: '100px' }} src={logoBranco} alt="Logo Edux" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Navbar.Collapse id="basic-navbar-nav">
                    </Navbar.Collapse>
                    <Nav>
                        <Nav.Link href="/" alt="Página inicial" style={{ color: '#00C2EE' }}><strong>Home</strong></Nav.Link>
                        <Nav.Link href="/login" alt="Página de login" style={{ color: '#00D65F' }}><strong>Login</strong></Nav.Link>
                        <Nav.Link href="/cadastrar" alt="Página de cadastro de usuário" style={{ color: '#F9E800' }}><strong>Cadastro</strong></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default Menu;