import React, {useState, useEffect} from 'react';
import {url} from '../../../utils/constants'
import { Container, Form, Button, Card, Table } from 'react-bootstrap';
import Menu from '../../../components/menu/index';
import Rodape from '../../../components/rodape/index';
import Titulo from '../../../components/titulo/index';

const Objetivo = () => {

    const [ id, setId ] = useState(0);
    const [descricao, setDescricao] = useState('');
    const [idCategoria, setIdCategoria] = useState('');
    const [objetivos, setObjetivo] = useState([]);
    const [categorias, setCategorias] = useState([]);


    useEffect(() => {
        listarCategorias();
        listarObjetivos();
    },[]);

    const listarCategorias = () => {

        fetch(`${url}/categoria`, {
            headers : {
                        
                        
                            
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            
        }
        })
            .then(response => response.json())
            .then(dados => {
                setCategorias(dados.data);
            })
            .catch(err => console.error(err));
    }

    const listarObjetivos= () => {
        fetch(`${url}/objetivo`, {
            headers : {
                        
                        
                            
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            
        }
        })
        .then(response => response.json())
        .then(dados => {
            setObjetivo(dados.data);

            limparCampos();
        })
        .catch(err => console.error(err));
    }
    
    const limparCampos = () => {
            
            setId(0);    
            setIdCategoria('');
            
            setDescricao('');
    }

    const salvar = ( event) => {
        event.preventDefault();

        const objetivo = {
            idCategoria : idCategoria, 
            descricao : descricao
        }
    

    let method = (id === 0 ? 'POST' : 'PUT');
    let urlRequest = (id === 0 ? `${url}/Objetivo` :  `${url}/Objetivo/${id}`);

    fetch(urlRequest, {
        method : method,
        body : JSON.stringify(objetivo),
        headers : {
            'content-type' : 'application/json',
            'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
        }
    })
    .then(response => response.json())
        .then(dados => {
           console.log(dados);
            alert('Objetivo salvo');

            listarObjetivos();
        })
        .catch(err => console.error(err))
    }
    const editar = (event) => {
        event.preventDefault();

        fetch(url + '/objetivo/' + event.target.value, {
            method : 'GET',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(dado => {
          
            setId(dado.id)
            setIdCategoria(dado.idCategoria);
            setDescricao(dado.descricao);
            console.log(dado);
        })
    }

    const remover = (event) => {
        event.preventDefault();

        fetch(url + '/objetivo/' + event.target.value,{
            method : 'DELETE',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Objetivo removido');

            listarObjetivos();
        })
    }


    return(
        <div>
            
            <Menu />
            <Titulo titulo="Objetivos" chamada="Gerencie os objetivos"/>
            <Container>
                

                <Card style={{backgroundColor : '#1d1d1d' , color : 'white', marginBottom : '30px'}} >
                        <Card.Body>
                        <Form onSubmit={event => salvar(event)}>
                           

                           

                          
                            
                            <Form.Group controlId="formDescricao">
                                <Form.Label>Descrição</Form.Label>
                             
                                        <Form.Control  as="textarea" rows={1} value={descricao} onChange={event => setDescricao(event.target.value)} />
                                        
                                 
                              </Form.Group>
                     
                                <Form.Group controlId="formBasicCategoria">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control as="select" size="lg" custom defaultValue={idCategoria} onChange={event => setIdCategoria(event.target.value)} >
                                    <option value={0}>Selecione</option>
                                    {
                                        categorias.map((item, index) => {
                                            return(
                                                <option key={index} value={item.id}>{item.tipo}</option>
                                            )
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>

                            <Button type="submit" >Salvar</Button>
                        </Form>
                        </Card.Body>
                    </Card>
                    <Card >
                        <Card.Body>
                        <Table variant='dark' bordered>
                            <thead>
                                <tr>
                                   
                                    <th>Descrição</th>
                                    <th>Categoria</th>
                                    <th>Ações</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    objetivos.map((item, index) => {
                                    return (
                                        <tr key={index}>

                                            <td>{item.descricao}</td>
                                    <td>{item.categoria.tipo}</td>
                                  
                                           
                                               
                                            
                                      
                                          
                                            <td>
                                                <Button type="button" variant="warning" value={item.id} onClick={ event => editar(event)}>Editar</Button>
                                                <Button type="button" variant="danger" value={item.id} style={{ marginLeft : '10px'}} onClick={ event => remover(event)}>Remover</Button>
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
        </div>
    )
}
export default Objetivo;