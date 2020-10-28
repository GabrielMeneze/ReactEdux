import React, { useState } from 'react';
import Menu from '../../components/menu';
import Rodape from '../../components/rodape';
import { url } from '../../utils/constants'
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import logoColorida from '../../assets/img/logoColorida.png';
import { Form, Container, Button } from 'react-bootstrap';
import './index.css';

const Turma = () => {
    let history = useHistory();

    const [turma, setTurma] = useState('')

    return (
        <div style={{background : '#2a2a2a'}}>
            <Menu />
            <Container className='form-height'style={{borderRadius : '10px', marginBottom : '8.1em', marginTop : '6em', color : 'white'}}>
            <div className="text-center">
                        <img src={logoColorida} alt="Edux" style={{ width: "128px",}} />
                    </div>
                    <br/>
                    <h2>Turmas</h2>
                    <hr/>
                    
                    <Form.Group controlId="formBasicTurma">
                        <Form.Control type="turma" value={Turma} onChange={event => setTurma(event.target.value)} placeholder="Insira a turma desejada" required />
                    </Form.Group>

                    <Button variant="success" type="submit">
                        Buscar
                    </Button>
            </Container>
            <Rodape />
        </div>
    )
}

export default Turma;