import React, { useEffect, useState } from 'react'
import { Container, Table, Button, Form, Card } from 'react-bootstrap';
import { url } from '../../../utils/constants'
import Menu from '../../../components/menu'
import Rodape from '../../../components/rodape'
import Titulo from '../../../components/titulo'

const CrudTurma = () => {
    const [idTurma, setIdTurma] = useState(0);
    const [periodo, setPeriodo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [turmas, setTurmas] = useState([]);
    const [objetivos, setObjetivos] = useState([]);
    const [idCurso, setIdCurso] = useState(0)
    const [curso, setCurso] = useState('');
    const [cursos, setCursos] = useState([]);


    useEffect(() => {
        listarTurmas()
        listarCursos()
    }, []);

    const listarTurmas = () => {
        fetch(url + 'turma')
            .then(response => response.json())
            .then(data => {
                setTurmas(data.data);
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

        fetch(`${url}turma/${event.target.value}`)
            .then(response => response.json())
            .then(dado => {
                console.log(dado)
                setIdTurma(dado.IdTurma)
                setPeriodo(dado.periodo)
                setObjetivos(dado.objetivos)
                setDescricao(dado.descricao)
            })
    }

    const excluir = (event) => {
        event.preventDefault();

        console.log(event.target.value)

        fetch(url + 'turma/' + event.target.value, {
            method: 'DELETE',
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
            .then(response => response.json())
            .then(dados => {
                alert('Turma removida.')
                listarTurmas()
            })
    }

    const salvar = (event) => {
        event.preventDefault();

        const turma = {
            descricao: descricao,
            idCurso : idCurso
        }

        let method = (idTurma === 0 ? 'POST' : 'PUT')
        let urlRequest = (idTurma === 0 ? `${url}turma` : `${url}turma/${idTurma}`)

        fetch(urlRequest, {
            method: method,
            body: JSON.stringify(turma),
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
            .then(response => response.json())
            .then(dados => {
                alert('Turma adicionada.');
                listarTurmas();
            })
    }

    const limparCampos = () => {
        setIdTurma(0);
        setPeriodo('');
        setCurso('');
        setObjetivos('');
        setDescricao('');
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
                                <Form.Control as="select" size="sg" custom defaultValue={idTurma} onChange={event => setIdCurso(parseInt(event.target.value))}>
                                    <option value="">Selecione uma instituição...</option>
                                    {
                                        cursos.map((item, index) => {
                                            return (
                                                <option key={index} value={item.idCurso}>{item.titulo}</option>
                                            )
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicTitulo">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control type="text" value={descricao} onChange={event => setDescricao(event.target.value)} placeholder="Insira a descrição da turma" />
                            </Form.Group>
                            <Button type="submit" style={{ background: '#00d65f', borderColor: '#00d65f' }}>Salvar</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <Table style={{ background: '#FFFFFF', borderRadius: '10px', marginTop: '2em' }} striped hover>
                    <thead>
                        <tr>
                            <th>Curso</th>
                            <th>Descrição</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            turmas.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.idCurso}</td>
                                        <td>{item.nome}</td>
                                        <td style={{ display: 'flex' }}>
                                            <Button variant="info" value={item.IdTurma} onClick={event => editar(event)} >Editar</Button>
                                            <Button variant="danger" value={item.IdTurma} onClick={event => excluir(event)} style={{ marginLeft: '10px' }}>Excluir</Button>
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