import React from 'react';
import './index'

const Rodape = () => {
    return (
        <footer className="text-center" style={{background: '#282828', color: 'white', padding: '3em', marginTop : '5em'}}>
            <div>
                <p>Todos os Direitos Reservados - SENAI SP.</p>
            </div>
            <small>Desenvolvido por <strong>The Boys</strong></small>
        </footer>
    );
}

export default Rodape;