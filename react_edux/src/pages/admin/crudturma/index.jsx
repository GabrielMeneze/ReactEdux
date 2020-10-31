import React, { useEffect, useState } from 'react'
import { Container, Table, Button, Form, Card } from 'react-bootstrap';
import { url } from '../../../utils/constants'
import Menu from '../../../components/menu'
import Rodape from '../../../components/rodape'
import Titulo from '../../../components/titulo'

const CrudTurma = () => {
    const [idCurso, setIdCurso] = useState(0);
    const [periodo, setPeriodo] = useState('');
    const [cursos, setCursos] = useState([]);
    const [instituicoes, setInstituicoes] = useState([]);

    useEffect(() => {
        listarCursos()
        listarInsitiuicao()
    }, []);

    const listarCursos = () => {
        fetch(url + 'curso')
            .then(response => response.json())
            .then(data => {
                setCursos(data.data);
                limparCampos();
            })
            .catch(err => console.error(err));
    }

    const listarInsitiuicao = () => {
        fetch(url + 'instituicao')
            .then(response => response.json())
            .then(data => {
                setInstituicoes(data.data);
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
                setPeriodo(dado.periodo)
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
                alert('Turma removida.')
                listarCursos()
            })
    }

    const salvar = (event) => {
        event.preventDefault();

        const curso = {
            periodo: periodo
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
                alert('Turma adicionada.');
                listarCursos();
            })
    }

    const limparCampos = () => {
        setIdCurso(0);
        setPeriodo('');
    }

    return (
        <div style={{ background: '#2a2a2a' }}>
            <Menu />
            <Container style={{ marginTop: '3em' }}>
                <Titulo
                    titulo="Turmas"
                    chamada="Gerencie as turmas."
                />
                <Card >
                    <Card.Body>
                        <Form onSubmit={event => salvar(event)}>
                            <Form.Group controlId="formBasicPerfil">
                                <Form.Label>Cursos</Form.Label>
                                <Form.Control as="select">
                                    {
                                        instituicoes.map((item, index) => {
                                            return (
                                                <option value={item.idInstituicao}>{item.nome}</option>
                                            )
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicTitulo">
                                <Form.Label>Período</Form.Label>
                                <Form.Control type="text" value={periodo} onChange={event => setPeriodo(event.target.value)} placeholder="Insira o período" />
                            </Form.Group>
                            <Button type="submit" style={{ background: '#00d65f', borderColor: '#00d65f' }}>Salvar</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <Table style={{ background: '#FFFFFF', borderRadius: '10px', marginTop: '2em' }} striped hover>
                    <thead>
                        <tr>
                            <th>Periodo</th>
                            <th>Curso</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cursos.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.periodo}</td>
                                        <td>{item.nome}</td>
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

export default CrudTurma;