import React, { useState } from 'react'
import Menu from '../../../components/menu'
import Rodape from '../../../components/rodape'

const CrudInsituicao = () => {
const [idInstituicao, setIdInsituicao] = useState(0);
const [idInstituicao, setIdInsituicao] = useState('');

    return (
        <div>
            <Menu />

            <Rodape />
        </div>
    )
}

export default CrudInsituicao;