import React, {useState, useEffect} from 'react';
import { Container, Form, Button, Card, Table } from 'react-bootstrap';
import {url} from '../../../utils/constants'
import Menu from '../../../components/menu/index';
import Rodape from '../../../components/rodape/index';
import Titulo from '../../../components/titulo/index';

const CrudCurtida = () => {
    const [id, setId] = useState(0);
    const [ like, setLike] = useState(0);
    const [idUsuario, setIdUsuario] = useState('');
    const [ curtidas, setCurtida] = useState([]);
    
    useEffect(() => {
        listarCurtida();
    }, [])
    
    
     const listarCurtida = () =>{
        fetch(`${url}/Curtida`, {
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(data => {
            setCurtida(data.data);
            
        })
        .catch(err => console.error(err));
     }
        
     //Metodo para dar dislike
     const dislike = (event) => {
        event.preventDefault();

        fetch(url + '/Curtida/' + event.target.value,{
            method : 'DELETE',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(data => {
            alert('Curtida excluida');

            listarCurtida();
        })
     }
    
     //Metodo para adicionar uma curtida
     const curtir = (event) =>{
        event.preventDefault();

        const curtida = {
            like : like,
            idUsuario : idUsuario,
        }

        let method = (id === 0 ? 'POST' : 'PUT');
        let urlRequest = (id === 0 ? `${url}/Curtida` :  `${url}/Curtida/${id}`);
        
         fetch(urlRequest ,{
             method : method,
             body : JSON.stringify(curtida),
             headers : {
                'content-type' : 'application/json',
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
             }
         }) 
         .then(response => response.json())
         .then(dados => {
             alert('Dica cadastrada');
             console.log(dados)
 
             listarCurtida();
         })

     }
      return(<div>
            
        <Menu />
        <Titulo titulo="Curtidas" chamada="Gerencie suas curtidas"/>
        <Container>
        
                <Card>
                    <Card.Body>
                    <Table bordered>
                        <thead>
                            <tr>
                            <th>Usuario</th>

                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                curtidas.map((item, index) => {
                                return (
                                    <tr key={index}>

                                <td>{item.idUsuario}</td>
                                <td>{item.like}</td>
                
                                        <td>
                                            <Button type="button" variant="danger" value={item.id} style={{ marginLeft : '10px'}} onClick={ event => dislike(event)}>Dislike</Button>
                                        </td>
                                    </tr>
                                )
                                })
                            }      
                        </tbody>
                    </Table>
                    </Card.Body>
                </Card>
        </Container>
       

        <Rodape />
    </div>)
  }

  export default CrudCurtida;