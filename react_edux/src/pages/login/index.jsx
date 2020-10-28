import React, { useState } from 'react';
import Menu from '../../components/menu';
import Rodape from '../../components/rodape';
import { url } from '../../utils/constants'
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import logoColorida from '../../assets/img/logoColorida.png';
import { Form, Container, Button } from 'react-bootstrap';
import './index.css';

const Login = () => {
    let history = useHistory();

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const logar = (event) => {
        event.preventDefault();

        fetch(url + 'login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                senha: senha
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => {
                // Verifica se a validação for OK e caso seja, informa a resposta
                if (response.ok)
                    return response.json();

                // Caso validação não seja OK informa um alert
                alert('Dado inválido');
            })
            .then(data => {

                // Armazena o token
                localStorage.setItem('token-edux', data.token);

                let usuario = jwt_decode(data.token)

                console.log(jwt_decode(data.token))

                // Role = 1 (Administrador)
                // Role = 2 (Padrão)

                // Após efetuar login encaminha para uma página
                if (usuario.Role === "1") {
                    history.push("/")
                } else {
                    history.push("/")
                }

            })
            .catch(err => console.error(err));
    }

    return (
        <div style={{background : '#2a2a2a'}}>
            <Menu />
            <Container className='form-height'style={{borderRadius : '10px', marginBottom : '8.1em', marginTop : '6em', color : 'white'}}>
                <Form className='form-signin' onSubmit={event => logar(event)} >
                    <div className="text-center">
                        <img src={logoColorida} alt="Nyous" style={{ width: "128px",}} />
                    </div>
                    <br />
                    <small>Informe os dados Abaixo</small>
                    <hr />

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="Informe o email" required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" value={senha} onChange={event => setSenha(event.target.value)} placeholder="Informe a senha" required />
                    </Form.Group>

                    <Button variant="success" type="submit">
                        Enviar
                    </Button>

                    <br /><br />
                    <a href="/cadastrar" style={{ marginTop: '30px', color : '#00C2EE' }}>Não tenho conta!</a>

                </Form>
            </Container>
            <Rodape />
        </div>
    )
}

export default Login;