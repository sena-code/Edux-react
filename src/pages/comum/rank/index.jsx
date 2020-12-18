import React, {useState, useEffect, useReducer} from 'react';
import {url} from '../../../utils/constants'
import { Carousel, Jumbotron, Button, Card, Row, Col, Container, Table, Form } from 'react-bootstrap';
import Menu from '../../../components/menu/index';
import Rodape from '../../../components/rodape/index';
import jwt_decode from 'jwt-decode';




const Rank = () => {

const [objetivoA, setObjetivoA] = useState([]);
const [usuario, setUsuario] = useState([]);

const [notass, setNotas] = useState([]);
const [nts, setNts] = useState([]);
const [notao, setNotao] = useState([]);



useEffect (() => {

    PegarNotas();
        Ordenar();
        listarObjetivoA();
}, []);


const PegarNotas = () => {

    fetch(`${url}/ObjetivoAluno`,
        {
            headers: {
                'content-type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            setNotas(data.data);
            console.log(notass);
        })
        .catch(err => console.error(err))

}


const Ordenar = () => {
    // notas.sort(compararNumeros)
    // console.log(notas)

    // function compararNumeros(a, b) {
    //     return a - b;
    // }
    //============================

    setNts(notass.map(p => p.nota))

    nts.sort(function (b, a) {

        return a - b;

    });
    

    console.log(nts);

    let fLen = notass.length;
    let nLen = nts.length;
    let e 

    for(e = 0; e < nLen; e++){

        for (let i = 0; i < fLen; i++) {
            
            let avaliar = notass.map(p => p.nota)[i];
            console.log('vavlor do i: '+i);
            console.log('vavlor do avaliar: '+avaliar);
            if (nts[e] === avaliar) {
                console.log('valor nts: ' + nts[e])
                notao.push(notass[i]);
                console.log('if funfo');
            }
            
        }
        console.log('valor do e: '+ e)

    }


    console.log(notao)

}


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

                                

                                <th>Notas</th>

                            </tr>
                        </thead>
                        <tbody>
                            
                        {notao.map((item, index) => {
                             return (
                                 
                              
                                <tr key={index}>
                                <td>{index + 1}</td>
                                 <td>{item.usuario.nome}</td>
                              <td>{item.nota}</td>
                             
                             
                             
                       
                                </tr>
                               
                           
                            
                             )
                           })}
                          
                        
                        </tbody>
                    </Table>
                    
                    </Card.Body>
                    <Button title="Ordenar" onClick={event => Ordenar(event)}>Ordenar</Button>
                </Card>

        </Jumbotron>





        <Rodape />
        </div>
    )




}

export default Rank;