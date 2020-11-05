import React, {useState, useEffect, useReducer} from 'react';
import {url} from '../../../utils/constants'
import { Carousel, Jumbotron, Button, Card, Row, Col, Container, Table, Form } from 'react-bootstrap';
import Menu from '../../../components/menu/index';
import Rodape from '../../../components/rodape/index';
import jwt_decode from 'jwt-decode';




const Rank = () => {

const [objetivoA, setObjetivoA] = useState([]);
const [usuario, setUsuario] = useState([]);



useEffect (() => {

    listarObjetivoA();
}, []);




const listarObjetivoA = () => {
    fetch(`${url}/ObjetivoAluno`,{
        headers : {
                
                
                    
            'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
        
    }
            
       
    })
    .then(response => response.json())
    .then(dados => {
       
        setObjetivoA(dados.data);
      
        console.log(dados.data);
    })
    .catch(err => console.error(err));
}

const listarUsuario = () => {
    fetch(`${url}/usuario`,{
        headers : {
                
                
                    
            'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
        
    }
            
       
    })
    .then(response => response.json())
    .then(dados => {
       
        setUsuario(dados.data);
        
        console.log(dados.data);
    })
    .catch(err => console.error(err));
}

    
const notaTotal = objetivoA.map(nota => {
    return{
        nota : nota.Nota + nota.Nota
}
})

    return(
        <div>
            <Menu />
            <Jumbotron className="text-center" >
            <h1>Ranking</h1>
            <Card>
                    <Card.Body>
                    <Table bordered>
                        <thead>
                            <tr>
                               
                                <th>#</th>
                                
                                <th>Usuario</th>

                                <th>Conquistas ocultas</th>

                                <th>Conquistas totais</th>

                                <th>Notas</th>

                            </tr>
                        </thead>
                        <tbody>
                            
                        {objetivoA.map((item, index) => {
                             return (
                                 
                              
                                <tr key={index}>
                                <td>{index + 1}</td>
                                 <td>{item.idAlunoTurma}</td>
                              <td>{}</td>
                             
                             
                             
                       
                                </tr>
                           
                            
                             )
                           })}
                          
                        
                        </tbody>
                    </Table>
                    </Card.Body>
                </Card>

        </Jumbotron>





        <Rodape />
        </div>
    )




}

export default Rank;