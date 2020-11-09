import React from 'react';
import { useHistory } from 'react-router-dom'
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import jwt_decode from 'jwt-decode'
import logoBranco from '../../assets/img/logoBranco.png'

const Menu = () => {
    const history = useHistory()

    const sair = (event) => {
        event.preventDefault();

        localStorage.removeItem('token-edux')

        history.push('/')
    }

    const renderMenu = () => {
        const token = localStorage.getItem('token-edux')

        if (token === null) {
            return (
                <Nav>
                    <Nav.Link href="/" alt="Página inicial" style={{ color: '#00C2EE' }}><strong>Home</strong></Nav.Link>
                    <Nav.Link href="/login" alt="Página de login" style={{ color: '#00D65F' }}><strong>Login</strong></Nav.Link>
                    <Nav.Link href="/cadastro" alt="Página de cadastro de usuário" style={{ color: '#F9E800' }}><strong>Cadastro</strong></Nav.Link>
                </Nav>
            );
        } else if (jwt_decode(token).Role === "1") {
            // Role = 1 (Administrador)
            // Role = 2 (Padrão)
            // Role = 3 (Professor)
            return (
                <Nav>
                     <Nav.Link href="/curso" alt="Página inicial" style={{ color: '#00C2EE' }}><strong>Cursos</strong></Nav.Link>
                    <Nav.Link href="/turma" alt="Página inicial" style={{ color: '#00D65F' }}><strong>Turmas</strong></Nav.Link>
                    <Nav.Link href="/cadastro" alt="Página de cadastro de usuário" style={{ color: '#FF271C ' }}><strong>Adicionar usuário</strong></Nav.Link>
                    <Dropdown>
                        <Dropdown.Toggle style={{ color: '#F9E800' }} variant="dark" id="dropdown-basic">
                            <strong>Dashboard</strong>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="/admin/crudcurso">Cursos</Dropdown.Item>
                            <Dropdown.Item href="/admin/crudinstituicao">Instituições</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle style={{ color: '#00C2EE' }} variant="dark" id="dropdown-basic">
                            <strong>{jwt_decode(token).nameid}</strong>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={event => sair(event)} >Sair</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            )
        } else {
            return (
                <Nav>
                    <Nav.Link href="/curso" alt="Página inicial" style={{ color: '#00C2EE' }}><strong>Cursos</strong></Nav.Link>
                    <Nav.Link href="/turma" alt="Página inicial" style={{ color: '#00D65F' }}><strong>Turmas</strong></Nav.Link>
                    <Dropdown>
                        <Dropdown.Toggle style={{ color: '#F9E800' }} variant="dark" id="dropdown-basic">
                            <strong>{jwt_decode(token).nameid}</strong>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={event => sair(event)} >Sair</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            )
        }
    }

    return (
        <div>
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand href="/"><img style={{ width: '100px' }} src={logoBranco} alt="Logo Edux" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Navbar.Collapse id="basic-navbar-nav">
                    </Navbar.Collapse>
                    {renderMenu()}
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default Menu;