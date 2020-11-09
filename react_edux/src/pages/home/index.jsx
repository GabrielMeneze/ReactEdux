import React from 'react';
import { Carousel, Jumbotron, Button, Container, Row, Col, Card } from 'react-bootstrap';
import Menu from '../../components/menu';
import Rodape from '../../components/rodape';

const Home = () => {
    return (
        <div style={{ background: 'white' }}>
            <Menu />
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://media-exp1.licdn.com/dms/image/C561BAQF4ImXQA9JqnA/company-background_10000/0?e=2159024400&v=beta&t=VPAXeefZUSD53KAJICque7AHlm2feGnOs9jGdGNljKw"
                        alt="Banner do SENAI"
                    />
                </Carousel.Item>
            </Carousel>
            <Jumbotron className="text-center" style={{ background: '#400B1E' }}>
                <h1 style={{ marginBottom: '1em', color: 'white' }}>A melhor escola técnica do <strong>Brasil</strong>!!!</h1>
                <p>
                    <Button variant="warning" href="/login" >Login</Button>
                    <Button variant="success" href="/cadastro" style={{ marginLeft: '30px' }}>Cadastrar</Button>
                </p>
            </Jumbotron>
            <Container>
                <Row>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://fluxoconsultoria.poli.ufrj.br/wp-content/uploads/2015/05/thinkstockphotos-896358708.jpg" />
                            <Card.Body>
                                <Card.Title>Dicas</Card.Title>
                                <Card.Text>
                                    Dicas feitas de professores para alunos.
                                </Card.Text>
                                <Button variant="danger">Ir para página de dicas</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://fluxoconsultoria.poli.ufrj.br/wp-content/uploads/2015/05/thinkstockphotos-896358708.jpg" />
                            <Card.Body>
                                <Card.Title>Cursos</Card.Title>
                                <Card.Text>
                                    Cursos de ensino técnico das instituições.
                                </Card.Text>
                                <Button variant="danger" href="/curso">Ir para página de cursos</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://fluxoconsultoria.poli.ufrj.br/wp-content/uploads/2015/05/thinkstockphotos-896358708.jpg" />
                            <Card.Body>
                                <Card.Title>Turmas</Card.Title>
                                <Card.Text>
                                    Informações de cada turma SENAI.
                                </Card.Text>
                                <Button variant="danger" href="/turma">Ir para página de turmas</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Rodape />
        </div>
    );
}

export default Home;