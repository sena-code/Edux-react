import React, {useState, useEffect} from 'react';
import {url} from '../../../utils/constants'
import { Container, Form, Button, Card, Table } from 'react-bootstrap';
import Menu from '../../../components/menu/index';
import Rodape from '../../../components/rodape/index';
import Titulo from '../../../components/titulo/index';

const ObjetivoA = () => {

    const [ id, setId ] = useState(0);
    const [dataAlcancada, setDataAlcanca] = useState('');
    const [idUsuario, setidUsuario] = useState('');
    const [idObjetivo, setidObjetivo] = useState('');
    const [nota, setNota] = useState(0);
    const [objetivosA, setObjetivoA] = useState([]);
    const [alunoTurma, setAlunoTurmas] = useState([]);
    const [objetivo, setObjetivo] = useState([]);
    const [Usuario, setUsuario] = useState([]);


    useEffect(() => {
        listarAlunoTurma();
        listarObjetivos();
        listarObjetivoAluno();
        listarUsuario();
    },[]);

    const listarObjetivoAluno = () => {
        fetch(`${url}/ObjetivoAluno`, {
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
    const listarAlunoTurma = () => {

        fetch(`${url}/AlunoTurma`, {
            headers : {
                        
                        
                            
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            
        }
        })
            .then(response => response.json())
            .then(dados => {
                setAlunoTurmas(dados);
               
                
                console.log(dados);
            })
            .catch(err => console.error(err));
    }

    const listarUsuario = () => {

        fetch(`${url}/Usuario`, {
            headers : {
                        
                        
                            
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            
        }
        })
            .then(response => response.json())
            .then(dados => {
              
                setUsuario(dados);
                
                console.log(dados);
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
            console.log(dados.data);

            limparCampos();
        })
        .catch(err => console.error(err));
    }
    
    const limparCampos = () => {
            
            setId(0);    
            setDataAlcanca('');
            setNota(0);
            setidObjetivo('');
            setidUsuario('');

    }

    const salvar = ( event) => {
        event.preventDefault();

        const objetivoA = {
            dataAlcancada : dataAlcancada, 
            idObjetivo : idObjetivo,
            nota : nota,
            idUsuario : idUsuario
        }
    

    let method = (id === 0 ? 'POST' : 'PUT');
    let urlRequest = (id === 0 ? `${url}/ObjetivoAluno` :  `${url}/ObjetivoAluno/${id}`);

    fetch(urlRequest, {
        method : method,
        body : JSON.stringify(objetivoA),
        headers : {
            'content-type' : 'application/json',
            'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
        }
    })
    .then(response => response.json())
        .then(dados => {
           console.log(dados);
            alert('Objetivo salvo');

            listarObjetivoAluno();
        })
        .catch(err => console.error(err))
    }
    const editar = (event) => {
        event.preventDefault();

        fetch(url + '/objetivoAluno/' + event.target.value, {
            method : 'GET',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(dado => {
          
            setId(dado.id)
            setNota(dado.nota);
            setDataAlcanca(dado.dataAlcancada);
            setidUsuario(dado.idUsuario);
            setidObjetivo(dado.idObjetivo);
            console.log(dado);
        })
    }

    const remover = (event) => {
        event.preventDefault();

        fetch(url + '/objetivoAluno/' + event.target.value,{
            method : 'DELETE',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Objetivo aluno removido');

            listarObjetivoAluno();
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
                                <Form.Label>Nota</Form.Label>
                             
                                        <Form.Control  as="textarea" rows={0} value={nota} onChange={event => setNota(event.target.value)} />
                                        
                                 
                              </Form.Group>

                              <Form.Group controlId="formDescricao">
                                <Form.Label>Data Alcançada</Form.Label>
                             
                                        <Form.Control  as="textarea" rows={0} value={dataAlcancada} onChange={event => setDataAlcanca(event.target.value)} />
                                        
                                 
                              </Form.Group>
                     
                                

                                    
                               
                                <Form.Group controlId="formObjetivo"></Form.Group>
                                <Form.Label>Objetivo</Form.Label>
                                <Form.Control as="select" size="lg" custom defaultValue={idObjetivo} onChange={event => setidObjetivo(event.target.value)} >
                                    <option value={0}>Selecione</option>
                                    {

                                        objetivo.map((item, index) => {
                                            return(
                                                <option key={index} value={item.id}>{item.descricao}</option>
                                            )
                                        })

                                    }
                                </Form.Control>

                                <Form.Group controlId="formObjetivo"></Form.Group>
                                <Form.Label>Aluno Turma</Form.Label>
                                <Form.Control as="select" size="lg" custom defaultValue={idUsuario} onChange={event => setidUsuario(event.target.value)} >
                                    <option value={0}>Selecione</option>
                                    {
                                       Usuario.map((item, index) => {
                                            return(
                                                <option key={index} value={item.id}>{item.nome}</option>
                                            )
                                        })
                                    }
                                    
                                </Form.Control>
                                    
                               

                                
        
                            

                            <Button type="submit" style={{marginTop : '10px'}}>Salvar</Button>
                        </Form>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                        <Table variant='dark' bordered>
                            <thead>
                                <tr>
                                   
                                    <th>Nota</th>
                                    <th>Data Alcançada</th>
                                    <th>Objetivo</th>
                                    <th>Id Aluno</th>
                                    <th>Ações</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    objetivosA.map((item, index) => {
                                    return (
                                        <tr key={index}>

                                  

                                    <td>{item.nota}</td>
                                                    
                                    <td>{item.dataAlcancada}</td>
                                    <td>{item.objetivo.descricao}</td>
                                    
                                    <td>{item.idUsuario}</td>
                                               
                                       
                                  
                                           
                                               
                                            
                                      
                                          
                                            <td>
                                                <Button type="button" variant="warning" value={item.id} onClick={ event => editar(event)}>Editar</Button>
                                                <Button type="button" variant="danger" value={item.id} style={{ marginTop : 'auto', marginLeft : '35px'}} onClick={ event => remover(event)}>Remover</Button>
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
export default ObjetivoA;