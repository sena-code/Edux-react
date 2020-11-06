import React, {useState, useEffect} from 'react';
import { Container, Form, Button, Card, Table, Row,Col } from 'react-bootstrap';
import {url} from '../../../utils/constants'
import Menu from '../../../components/menu/index';
import Rodape from '../../../components/rodape/index';
import Titulo from '../../../components/titulo/index';
import jwt_decode from 'jwt-decode';


const DicaComum = () => {

    const [dicas, setDica] = useState([]);

    useEffect(() => {
        listarDica();
      
    }, [])
  
    
     const listarDica = () =>{
        fetch(`${url}/Dica`, {
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(data => {
            setDica(data.data);
            
          
        })
        .catch(err => console.error(err));
     }

     return(<div>
         <Menu />

         <Titulo titulo="Suas Dicas" chamada="Dicas feitas unicamente para você"/>

         <Container>
        <Row>
                


                {
                    dicas.map((item, index) => {
                        
                        const token = localStorage.getItem('token-edux')
            
                        let usuario = jwt_decode(token);

                        if(item.idUsuario == usuario.idUsuario){
                        return (
                            <Col key={index} xs='4'>
                                <Card>
                                    <Card.Img variant="top" src={item.urlImagem}/>
                                    <Card.Body>
                                    <Card.Text style={{textAlign : 'center'}}>{item.texto}</Card.Text>
                                    
                                    </Card.Body>
                                  
                                </Card>
                            </Col>
                        )}
                    })
                }
            </Row>
        </Container>






         <Rodape />




     </div>

     )


}


export default DicaComum;