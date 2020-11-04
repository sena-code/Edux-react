import React, {useState, useEffect} from 'react';
import { Container, Form, Button, Card, Table } from 'react-bootstrap';
import {url} from '../../../utils/constants'
import Menu from '../../../components/menu/index';
import Rodape from '../../../components/rodape/index';
import Titulo from '../../../components/titulo/index'

const CrudTurma = () => {
    const [id, setId] = useState(0);
    const [descricao, setDescricao] = useState('');
    const [curso, setCurso] = useState([]);
    const [ turmas, setTurma] = useState([]);
    const[idCurso, setIdCurso] = useState('');
    
    useEffect(() => {
        listarTurma();
        listarCurso();
    }, [])
  
     const listarTurma = () =>{
        fetch(`${url}/Turma`)
        .then(response => response.json())
        .then(dados => {
            setTurma(dados.data);
            
            limparCampo();
        })
        .catch(err => console.error(err));
     }
     const listarCurso = () =>{
        fetch(`${url}/Curso`)
        .then(response => response.json())
        .then(data => {
            setCurso(data.data);
            
            limparCampo();
        })
        .catch(err => console.error(err));
     }
     
     //Metodo para limpar o campo do formulario após o professor ter salvo uma turma
     const limparCampo = () =>{
            setId(0);
            setDescricao('');
            setIdCurso('');
     }
     
     //Metodo para excluir uma turma
     const remover = (event) => {
        event.preventDefault();

        fetch(url + '/Turma/' + event.target.value,{
            method : 'DELETE',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Turma excluida');

            listarTurma();
        })
     }
    
     //Metodo para adicionar uma turma
     const salvar = (event) => {
        event.preventDefault();

        const turma = {
            idCurso : idCurso,
            descricao : descricao

        }

        //if ternário para saber se vai fazer um post ou put
        let method = (id === 0 ? 'POST' : 'PUT');
        let urlRequest = (id === 0 ? `${url}/turma` : `${url}/turma/${id}`);

        fetch(`${urlRequest}`,  {
            
            method : method,
            body : JSON.stringify(turma),
            headers : {
                'content-type' : 'application/json',
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
         
        .then(dados => {
            
            alert('Evento salva');

            listarTurma();
        })
        .catch(err => console.error(err))
    }
     //Metodo para editar uma turma
     const editar = (event) =>{
         event.preventDefault();

         fetch(url + '/Turma/' + event.target.value, {
            method : 'GET',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(dado => {
            setId(dado.id);
            setDescricao(dado.descricao);
            setIdCurso(dado.idCurso);
        })
    }
     
      return(<div>
            
        <Menu />
        <Titulo titulo="Turmas" chamada="Gerencie turmas"/>
        <Container>
            

            <Card>
                    <Card.Body>
                    <Form onSubmit={event => salvar(event)}>
                        
                        <Form.Group controlId="formDescricao">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control as="textarea" rows={3} value={descricao} onChange={event => setDescricao(event.target.value)} />
                        </Form.Group>
                        
                        <Form.Group controlId="formCurso">
                            <Form.Label>Curso</Form.Label>
                            <Form.Control as="select" value={idCurso} onChange={ event => setIdCurso(event.target.value)}>
                                <option value={0}>Selecione</option>
                                {
                                    curso.map((item, index) => {
                                        return (
                                            <option key={index} value={item.id}>{item.titulo}</option>
                                        )
                                    })
                                }
                            </Form.Control>
                        </Form.Group>

                        <Button type="submit" >Adicionar</Button>
                    </Form>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                    <Table bordered>
                        <thead>
                            <tr>
                               
                                <th>Descrição</th>
                                <th>Curso</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                turmas.map((item, index) => {
                                return (
                                    <tr key={index}>

                                        <td>{item.descricao}</td>
                                <td>{item.curso.titulo}</td>
                                      
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
    </div>)
  }

  export default CrudTurma;