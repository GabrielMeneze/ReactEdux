import React, { useEffect, useState } from 'react'
import { Carousel, Jumbotron, Button, Container, Row, Col, Card, Popover, OverlayTrigger } from 'react-bootstrap';
import Menu from '../../components/menu';
import Rodape from '../../components/rodape';
import { url } from '../../utils/constants';

const Curso = () => {
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
            })
            .catch(err => console.error(err));
    }

    const listarCursos = () => {
        fetch(url + 'curso')
            .then(response => response.json())
            .then(data => {
                setCursos(data.data);
            })
            .catch(err => console.error(err));
    }

    const popoverInformatica = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Informações sobre a instituição</Popover.Title>
            <Popover.Content>
                {
                    instituicoes.map((item, index) => {
                        return (
                            <p key={index}>
                                Rua: {item.logradouro}<br />
                                Bairro: {item.bairro}<br />
                                Numero: {item.numero}
                            </p>
                        )
                    })
                }
            </Popover.Content>
        </Popover>
    );

    const PopoverInformatica = () => (
        <OverlayTrigger trigger="click" placement="right" overlay={popoverInformatica}>
            <Button style={{ background: '#00C2EE', borderColor: '#00C2EE' }}>Clique para mais informações</Button>
        </OverlayTrigger>
    );

    return (
        <div style={{ background: '#2a2a2a' }}>
            <Menu />
            <Container>
                <Row style={{ margin: '3em -1em 0' }}>
                    {
                        cursos.map((item, index) => {
                            return (
                                <Card style={{ width: '20rem', margin: '1em' }}>
                                    <Card.Body>
                                        <Card.Title value={item.titulo}>{item.titulo}</Card.Title>
                                        <Card.Text>{ item.idInstituicaoNavigation.nome}</Card.Text>
                                        <PopoverInformatica />
                                    </Card.Body>
                                </Card>
                            )
                        })
                    }
                </Row>
            </Container>
            <Rodape />
        </div>
    );
}

export default Curso