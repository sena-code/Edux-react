import React, {useState, useEffect} from 'react';
import { Container, Form, Button, Card, Table } from 'react-bootstrap';
import {url} from '../../../utils/constants'
import Menu from '../../../components/menu/index';
import Rodape from '../../../components/rodape/index';
import Titulo from '../../../components/titulo/index';

const CrudDica = () => {
    const [id, setId] = useState(0);
    const [texto, setTexto] = useState('');
    const [idUsuario, setIdUsuario] = useState('');
    const [urlimagem, setUrlImagem] = useState('');
    const [ dicas, setDica] = useState([]);
    
    useEffect(() => {
        listarDica();
        
    }, [])
  
    
     const listarDica = () =>{
        fetch(`${url}/Dica`)
        .then(response => response.json())
        .then(data => {
            setDica(data.data);
            
            limparCampo();
        })
        .catch(err => console.error(err));
     }
     
     //Metodo para limpar o campo do formulario após o professor ter salvo um curso
     const limparCampo = () =>{
            setId(0);
            setTexto('');
            setIdUsuario('');
            setUrlImagem('');
     }
     
     //Metodo para excluir uma dica
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
            alert('Dica excluida');

            listarDica();
        })
     }
    
     //Metodo para adicionar uma dica
     const adicionar = (event) =>{
        event.preventDefault();

        const dica = {
            texto : texto,
            idUsuario : idUsuario,
            urliamgem : urlimagem
        }

        let method = (id === 0 ? 'POST' : 'PUT');
        let urlRequest = (id === 0 ? `${url}/Dica` :  `${url}/Dica/${id}`);

         fetch(urlRequest ,{
             method : method,
             body : JSON.stringify(dica),
             headers : {
                'content-type' : 'application/json',
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
             }
         }) 
         .then(response => response.json())
         .then(dados => {
             alert('Dica cadastrada');
 
             listarDica();
         })

     }
     //Metodo para editar uma dica
     const editar = (event) =>{
         event.preventDefault();

         fetch(url + '/Dica/' + event.target.value, {
            method : 'GET',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(dado => {
            setId(dado.id);
            setTexto(dado.titulo);
            setIdUsuario(dado.idInstituicao);
            setUrlImagem(dado.urlimagem);
        })
    }
     
      return(<div>
            
        <Menu />
        <Titulo titulo="Dicas" chamada="Gerencie suas dicas"/>
        <Container>
            

            <Card>
                    <Card.Body>
                    <Form onSubmit={event => adicionar(event)}>
                        
                        <Form.Group controlId="formTitulo">
                            <Form.Label>Texto</Form.Label>
                            <Form.Control as="textarea" rows={3} value={texto} onChange={event => setTexto(event.target.value)} />
                        </Form.Group>
                        
                        <Form.Group controlId="formInstituicao">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control as="select" value={idUsuario} onChange={ event => setIdUsuario(event.target.value)}>
                                <option value={0}>Selecione</option>
                                {
                                    dicas.map((item, index) => {
                                        return (
                                            <option key={index} value={item.id}>{item.texto}</option>
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
                               
                                <th>Texto</th>
                                
                                <th>Usuario</th>

                                
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dicas.map((item, index) => {
                                return (
                                    <tr key={index}>

                                        <td>{item.id}</td>
                                <td>{item.dicas =  dicas.map((item, index) => {
                                        return (
                                            <option key={index} value={item.dicas}>{item.texto}</option>
                                            
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

  export default CrudDica;