import React, {useState, useEffect} from 'react';
import { Container, Form, Button, Card, Table } from 'react-bootstrap';
import {url} from '../../../utils/constants'
import Menu from '../../../components/menu/index';
import Rodape from '../../../components/rodape/index';
import Titulo from '../../../components/titulo/index';

const CrudPost = () => {
    const [id, setId] = useState(0);
    const [idUsuario, setIdUsuario] = useState('');
    const [usuario, setUsuario] = useState([]);
    const [urlImagem, setUrlImagem] = useState('');
    const [post, setPost] = useState([]);
    const [texto, setTexto] = useState('');
    const [Imagem, setImagem] = useState('');
    
    useEffect(() => {
        listarPost();
        
    }, [])
  
    
     const listarPost = () =>{
        fetch(`${url}/Post`)
        .then(response => response.json())
        .then(data => {
            setPost(data.data);
            
            limparCampo();
        })
        .catch(err => console.error(err));
     }
     
     //Metodo para limpar o campo do formulario após o professor ter salvo um curso
     const salvar = (event) => {
        event.preventDefault();

        const posts = {
            texto : texto,
            idUsuario : idUsuario,
            urlImagem : urlImagem,
            Imagem : Imagem
        }

        
        let method = (id === 0 ? 'POST' : 'PUT');
        let urlRequest = (id === 0 ? `${url}/Post` :  `${url}/Post/${id}`);

        fetch(urlRequest, {
            method : method,
            body : JSON.stringify(posts),
            headers : {
                'content-type' : 'application/json',
                'authorization' : 'Bearer ' + localStorage.getItem('token-nyous-tarde')
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Post salvo');

            listarPost();
        })
        .catch(err => console.error(err))
    }

    const uploadFile = (event) => {
        event.preventDefault()

        console.log(event);
        //crio o formulário para envio do arquivo
        let formdata = new FormData();
        formdata.append('arquivo', event.target.files[0]);
        
        fetch(`${url}/Upload`,
        {
            method : 'POST',
            body : formdata,
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(data =>{
            setUrlImagem(data.url);
        })
        .catch(err => console.error(err))
    }
    const limparCampo = () => {
        setId(0);
        setTexto('');
        setIdUsuario('');
        setImagem('');
    }
     
      return(<div>
            
        <Menu />
        <Titulo titulo="Post" chamada="Gerencie seus posts"/>
        <Container>
            

            <Card>
                    <Card.Body>
                    <Form onSubmit={event => salvar(event)}>
                        
                        <Form.Group controlId="formTitulo">
                            <Form.Label>Texto</Form.Label>
                            <Form.Control as="textarea" rows={3} value={texto} onChange={event => setTexto(event.target.value)} />
                        </Form.Group>
                        
                        <Form.Group controlId="formInstituicao">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control as="select" value={idUsuario} onChange={ event => setIdUsuario(event.target.value)}>
                                <option value={0}>Selecione</option>
                                {
                                    post.map((item, index) => {
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
                                post.map((item, index) => {
                                return (
                                    <tr key={index}>

                                        <td>{item.id}</td>
                                <td>{item.post =  post.map((item, index) => {
                                        return (
                                            <option key={index} value={item.dicas}>{item.texto}</option>
                                            
                                        )
                                    })}</td>
                                      
                                        <td>
                                           
                                           
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

  export default CrudPost;