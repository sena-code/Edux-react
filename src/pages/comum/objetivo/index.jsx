import React, {useState, useEffect} from 'react';
import {url} from '../../../utils/constants'
import { Carousel, Jumbotron, Button, Card, Row, Col, Container, Table } from 'react-bootstrap';
import Menu from '../../../components/menu/index';
import Rodape from '../../../components/rodape/index'
import Titulo from '../../../components/titulo';

const ObjetivoComum = () => {
const [objetivos, setObjetivo] = useState([]);

useEffect  ( () =>{
    listarObjetivo();
}, [])


const listarObjetivo = () => {

    fetch(`${url}/objetivo`, {
        headers : {
                    
                    
                        
            'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
        
    }
    })
    .then(response => response.json())
    .then(dados => {
        setObjetivo(dados.data);
        console.log(dados)
    })
}



return(<div>

    <Menu />
<Titulo titulo="Objetivos" chamada="Todos os Objetivos" />
    <Container>
    <Table variant='dark'  striped bordered hover>
                            <thead>
                                <tr>
                                
                                <th>Objetivos</th>
                                <th>Categoria</th>
                               
                               
                                </tr>
                         </thead>
                        <tbody >
                        
            {
                objetivos.map((item, index) => {
                    return(

                        
                        <tr key={index} >
                    <td>{item.descricao}</td>
                    <td>{item.categoria.tipo}</td>
                
                  
                    
                     
                    
                        
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
export default ObjetivoComum;