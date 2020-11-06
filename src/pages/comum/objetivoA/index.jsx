import React, {useState, useEffect} from 'react';
import {url} from '../../../utils/constants'
import { Carousel, Jumbotron, Button, Card, Row, Col, Container, Table } from 'react-bootstrap';
import Menu from '../../../components/menu/index';
import Rodape from '../../../components/rodape/index'
import Titulo from '../../../components/titulo';
import jwt_decode from 'jwt-decode';

const ObjetivoAComum = () => {
const [objetivosA, setObjetivoA] = useState([]);
const [alunoTurma, setAlunoTurma] = useState([]);


useEffect  ( () =>{
    listarObjetivo();
    listarAlunoTurma();
}, [])


const listarObjetivo = () => {

    fetch(`${url}/objetivoAluno`, {
        headers : {
                    
                    
                        
            'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
        
    }
    })
    .then(response => response.json())
    .then(dados => {
        setObjetivoA(dados.data);
        console.log(dados)
    })
}

const listarAlunoTurma = () => {

    fetch(`${url}/AlunoTurma`, {
        headers : {
                    
                    
                        
            'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
        
    }
    })
    .then(response => response.json())
    .then(dados => {
        setAlunoTurma(dados);
        console.log(dados)
    })
}




return(<div>

    <Menu />
<Titulo titulo="Seus Objetivos" chamada="Notas e datas alcançadas atribuidas pelo professor" />
    <Container>
    <Table variant='dark'  striped bordered hover>
                            <thead>
                                <tr>
                                
                                <th>Objetivo</th>
                                <th>Data Alcançada</th>
                                <th>Nota</th>
                               
                               
                                </tr>
                         </thead>
                        <tbody >
                        
            {
                 objetivosA.map((item, index) => {
                    
                    const token = localStorage.getItem('token-edux')
        
                    let usuario = jwt_decode(token);
                        if(item.idUsuario == usuario.idUsuario){

                   

                   
                    return(

                        
                        <tr key={index} >
                    <td>{item.objetivo.descricao}</td>
                    <td>{item.dataAlcancada}</td>
                    <td>{item.nota}</td>
                   
                
                  
                    
                     
                    
                        
                        </tr>
                        
                        
                    )}
                })
                 
                    
                
               
            }
            </tbody>
            </Table>
        </Container>












    <Rodape />







</div>



)
}
export default ObjetivoAComum;