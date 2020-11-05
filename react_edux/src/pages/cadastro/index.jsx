import React, { useEffect, useState } from 'react';
import Menu from '../../components/menu';
import Rodape from '../../components/rodape';
import { url } from '../../utils/constants'
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import logoColorida from '../../assets/img/logoColorida.png';
import { Form, Container, Button } from 'react-bootstrap';
import './index.css'

const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [idPerfil, setIdPerfil] = useState(0);
    const [perfis, setPerfis] = useState([])

    const history = useHistory();

    useEffect(() => {
        listarPerfis()
    }, []);

    const listarPerfis = () => {
        fetch(url + 'perfil')
            .then(response => response.json())
            .then(data => {
                setPerfis(data.data);
                limparCampos()
            })
            .catch(err => console.error(err));
    }

    const limparCampos = () => {
        setIdPerfil(0);
        setNome('');
        setSenha('');
        setEmail('');
    }


    const cadastro = (event) => {
        event.preventDefault();

        fetch((url + 'usuario'), {
            method: 'POST',
            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha,
                idPerfil: idPerfil

            }),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    console.log(response.json());

                    alert('Usuario cadastrado! Agora faça login');

                    history.push('/login')
                }
            })
    }
    return (
        <div style={{ background: '#2a2a2a' }}>
            <Menu />
            <Container className='form-height' style={{ borderRadius: '10px', marginBottom: '8.1em', marginTop: '6em', color: 'white' }}>
                <Form className='form-signin' onSubmit={event => cadastro(event)} >
                    <div className="text-center">
                        <img src={logoColorida} alt="Edux" style={{ width: "128px" }} />
                    </div>
                    <br />
                    <small>Informe os dados Abaixo</small>

                    <Form.Group controlId="formBasicName">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Informe o seu nome" value={nome} onChange={event => setNome(event.target.value)} required />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Informe o email" value={email} onChange={event => setEmail(event.target.value)} required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Informe a senha" value={senha} onChange={event => setSenha(event.target.value)} required />
                    </Form.Group>


                    <Form.Group controlId="formBasicPerfil">
                        <Form.Label>Tipo de usuário</Form.Label>
                        <Form.Control as="select" type="text" placeholder="Informe o tipo de usuário" value={idPerfil} onChange={event => setIdPerfil(parseInt(event.target.value))} style={{
                            backgroundColor: '#2a2a2a',
                            color: 'white',
                            marginBottom: '-1px',
                            borderBottomRightRadius: '0',
                            borderBottomLeftRadius: '0'
                        }}>
                            <option value="">Selecione um tipo de usuário...</option>
                            {
                                perfis.map((item, index) => {
                                    return (
                                        <option key={item.idPerfil.parseInt} value={item.idPerfil}>{item.permissao}</option>
                                    )
                                })
                            }
                        </Form.Control>
                    </Form.Group>


                    <Button style={{ background: '#00D65F', borderColor: '#00D65F' }} type="submit">
                        Enviar
                        </Button>
                    <br /><br />
                    <a href="/login" style={{ marginTop: '30px', color: '#00C2EE' }}>Já tenho conta!</a>
                </Form>
            </Container>
            <Rodape />
        </div >
    )
}

export default Cadastro;