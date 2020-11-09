import React, { useEffect, useState } from 'react'
import { Container, Table, Button, Form, Card } from 'react-bootstrap';
import { url } from '../../../utils/constants'
import Menu from '../../../components/menu'
import Rodape from '../../../components/rodape'
import Titulo from '../../../components/titulo'

const CrudCurso = () => {
    const [idCurso, setIdCurso] = useState(0);
    const [idInstituicao, setIdInstituicao] = useState(0);
    const [titulo, setTitulo] = useState('');
    const [cursos, setCursos] = useState([]);
    const [instituicoes, setInstituicoes] = useState([]);

    useEffect(() => {
        listarCursos()
        listarInstitiuicao()
    }, []);

    const listarInstitiuicao = () => {
        fetch(url + 'instituicao')
            .then(response => response.json())
            .then(data => {
                setInstituicoes(data.data);
                console.log(data.data)
                limparCampos();
            })
            .catch(err => console.error(err));
    }

    const listarCursos = () => {
        fetch(url + 'curso')
            .then(response => response.json())
            .then(data => {
                setCursos(data.data);
                limparCampos();
            })
            .catch(err => console.error(err));
    }

    const editar = (event) => {
        event.preventDefault();

        fetch(`${url}curso/${event.target.value}`)
            .then(response => response.json())
            .then(dado => {
                console.log(dado)
                setIdCurso(dado.idCurso)
                setIdInstituicao(dado.idInstituicao)
                setTitulo(dado.titulo)
            })
    }

    const excluir = (event) => {
        event.preventDefault();

        console.log(event.target.value)

        fetch(url + 'curso/' + event.target.value, {
            method: 'DELETE',
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
            .then(response => response.json())
            .then(dados => {
                alert('Curso removido!')
                listarCursos()
            })
    }

    const salvar = (event) => {
        event.preventDefault();

        const curso = {
            titulo: titulo,
            idInstituicao: idInstituicao,
        }

        let method = (idCurso === 0 ? 'POST' : 'PUT')
        let urlRequest = (idCurso === 0 ? `${url}curso` : `${url}curso/${idCurso}`)

        fetch(urlRequest, {
            method: method,
            body: JSON.stringify(curso),
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
            .then(response => response.json())
            .then(dados => {
                alert('Curso salvo!');
                listarCursos();
            })
    }


    const limparCampos = () => {
        setIdCurso(0);
        setIdInstituicao(0);
        setTitulo('');
    }

    return (
        <div style={{ background: '#2a2a2a' }}>
            <Menu />
            <Container style={{ marginTop: '3em' }}>
                <Titulo
                    titulo="Cursos"
                    chamada="Gerencie os cursos"
                />
                <Card >
                    <Card.Body>
                        <Form onSubmit={event => salvar(event)}>
                            <Form.Group controlId="formBasicTitulo">
                                <Form.Label>Título</Form.Label>
                                <Form.Control type="text" value={titulo} onChange={event => setTitulo(event.target.value)} placeholder="Insira o título" />
                            </Form.Group>
                            <Form.Group controlId="formBasicInstituicao">
                                <Form.Label>Instituição</Form.Label>
                                <Form.Control as="select" size="sg" custom defaultValue={idInstituicao} onChange={event => setIdInstituicao(parseInt(event.target.value))}>
                                    <option value="">Selecione uma instituição...</option>
                                    {
                                        instituicoes.map((item, index) => {
                                            return (
                                                <option key={index} value={item.idInstituicao}>{item.nome}</option>
                                            )
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Button type="submit" style={{ background: '#00d65f', borderColor: '#00d65f' }}>Salvar</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <Table style={{ background: '#FFFFFF', borderRadius: '10px', marginTop: '2em' }} striped hover>
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Instituição</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cursos.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.titulo}</td>
                                        {
                                            instituicoes.map((item, index) => {
                                                return (
                                                    <td>{item.nome}</td>
                                                )
                                            })
                                        }
                                        <td style={{ display: 'flex' }}>
                                            <Button variant="info" value={item.idCurso} onClick={event => editar(event)} >Editar</Button>
                                            <Button variant="danger" value={item.idCurso} onClick={event => excluir(event)} style={{ marginLeft: '10px' }}>Excluir</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </Table>
            </Container>
            <Rodape />
        </div>
    )
}

export default CrudCurso;