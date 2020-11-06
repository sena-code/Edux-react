import React, {useState, useEffect} from 'react';
import { Container, Form, Button, Card, Table } from 'react-bootstrap';
import {url} from '../../../utils/constants'
import Menu from '../../../components/menu/index';
import Rodape from '../../../components/rodape/index';
import Titulo from '../../../components/titulo/index';

const CrudCurso = () => {
    const [id, setId] = useState(0);
    const [titulo, setTitulo] = useState('');
    const [idInstituicao, setIdInstituicao] = useState('');
    const [ cursos, setCurso] = useState([]);
    const [instituicao, setInstituicao] = useState([]);
    
    useEffect(() => {
        listarCurso();
        listarInstituicao();
        
    }, [])
  
    
     const listarCurso = () =>{
        fetch(`${url}/Curso`)
        .then(response => response.json())
        .then(data => {
            setCurso(data.data);
            
            limparCampo();
        })
        .catch(err => console.error(err));
     }

     const listarInstituicao = () =>{
        fetch(`${url}/Instituicao`, {
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(data => {
            setInstituicao(data.data);
            
            limparCampo();
        })
        .catch(err => console.error(err));
     }
     
     //Metodo para limpar o campo do formulario após o professor ter salvo um curso
     const limparCampo = () =>{
            setId(0);
            setTitulo('');
            setIdInstituicao('');
     }
     
     //Metodo para excluir um curso
     const remover = (event) => {
        event.preventDefault();

        fetch(url + '/Curso/' + event.target.value,{
            method : 'DELETE',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(data => {
            alert('Curso excluido');

            listarCurso();
        })
     }
    
     //Metodo para adicionar um curso
     const adicionar = (event) =>{
        event.preventDefault();

        const curso = {
            titulo : titulo,
            idInstituicao : idInstituicao
        }

        let method = (id === 0 ? 'POST' : 'PUT');
        let urlRequest = (id === 0 ? `${url}/Curso` :  `${url}/Curso/${id}`);

         fetch(urlRequest ,{
             method : method,
             body : JSON.stringify(curso),
             headers : {
                'content-type' : 'application/json',
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
             }
         }) 
         .then(response => response.json())
         .then(dados => {
             alert('Curso cadastrado');
 
             listarCurso();
         })

     }
     //Metodo para editar um curso
     const editar = (event) =>{
         event.preventDefault();

         fetch(url + '/Curso/' + event.target.value, {
            method : 'GET',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(dado => {
            setId(dado.id);
            setTitulo(dado.titulo);
            setIdInstituicao(dado.idInstituicao);
        })
    }
     
      return(<div>
            
        <Menu />
        <Titulo titulo="Cursos" chamada="Gerencie os cursos"/>
        <Container>
            

            <Card style={{backgroundColor : '#1d1d1d' , color : 'white'}} >
                    <Card.Body>
                    <Form onSubmit={event => adicionar(event)}>
                        
                        <Form.Group controlId="formTitulo">
                            <Form.Label>Titulo</Form.Label>
                            <Form.Control as="textarea" rows={3} value={titulo} onChange={event => setTitulo(event.target.value)} />
                        </Form.Group>
                        
                        <Form.Group controlId="formInstituicao">
                            <Form.Label>Instituição</Form.Label>
                            <Form.Control as="select" value={idInstituicao} onChange={ event => setIdInstituicao(event.target.value)}>
                                <option value={0}>Selecione</option>
                                {
                                    instituicao.map((item, index) => {
                                        return (
                                            <option key={index} value={item.id}>{item.nome}</option>
                                        )
                                    })
                                }
                            </Form.Control>
                        </Form.Group>

                        <Button type="submit" >Adicionar</Button>
                    </Form>
                    </Card.Body>
                </Card>
                <Card style={{marginTop : '25px'}} >
                    <Card.Body>
                    <Table variant='dark' bordered>
                        <thead>
                            <tr>
                               
                                <th>Titulo</th>
                                
                                <th>Instituição</th>

                                
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cursos.map((item, index) => {
                                return (
                                    <tr key={index}>

                                        <td>{item.titulo}</td>
                                <td>{item.idInstituicao =  instituicao.map((item, index) => {
                                        return (
                                            <option key={index} value={item.idInstituicao}>{item.nome}</option>
                                        )
                                    })}</td>
                                      
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

  export default CrudCurso;