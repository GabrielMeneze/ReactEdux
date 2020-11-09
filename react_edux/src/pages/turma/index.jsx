import React, { useState, useEffect } from 'react';
import Menu from '../../components/menu';
import Rodape from '../../components/rodape';
import logoColorida from '../../assets/img/logoColorida.png';
import { Form, Container, Button } from 'react-bootstrap';
import './index.css';
import { url } from '../../utils/constants';

const Turma = () => {
    return (
        <div style={{background : '#2a2a2a'}}>
            <Menu />
            <Container className='cont'style={{borderRadius : '10px', marginBottom : '8.1em', marginTop : '6em', color : 'white'}}>
            <div className="text-center">
                        <img src={logoColorida} alt="Edux" style={{ width: "128px",}} />
                    </div>

                    <div className ='blocos'>
                        <div className ='caixa'>
                            <br/>
                            <h5 className ='title'>Desenvolvimento de Sistemas (Matutino)</h5>
                            <hr/>
                            <p>
                            <Button href="/" style={{ marginBottom: '15px', marginLeft: '15px', marginRight: '15px', color: '#FFFFFF' }}>Descrição</Button>
                            <Button href="#" trigger="click" data-toggle="popover"  style={{ marginBottom: '15px', marginLeft: '15px', marginRight: '15px', color: '#FFFFFF' }} title="O aluno deverá ser capaz de desenvolver em diversas linguagens">Objetivos</Button>
                            </p>
                        </div>
                    </div>

            </Container>
            <Rodape />
        </div>
    )
}



export default Turma;

