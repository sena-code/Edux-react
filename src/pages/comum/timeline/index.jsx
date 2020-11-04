import React, {useState, useEffect} from 'react';
import {url} from '../../../utils/constants'
import { Carousel, Jumbotron, Button, Card, Row, Col, Container, Table, Form } from 'react-bootstrap';
import Menu from '../../../components/menu/index';
import Rodape from '../../../components/rodape/index';
import jwt_decode from 'jwt-decode';

const TimelineA = () => {

      const [id, setId] = useState(0);
      const [idUsuario, setIdUsuario] = useState('');
      const [usuario, setUsuario] = useState([]);
      const [urlImagem, setUrlImagem] = useState('');
      const [post, setPost] = useState([]);
      const [texto, setTexto] = useState('');
      const [Imagem, setImagem] = useState('');
    
      
        

      useEffect(() => {
        listarUsuario();
        listarPost();
    }, [])

      const listarUsuario = () => {
        fetch(`${url}/usuario`)
        .then(response => response.json())
        .then(dados => {
            setUsuario(dados);
            
            limparCampo();
        })
        .catch(err => console.error(err));
      }

      const listarPost = () => {
        fetch(`${url}/post`, {
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(dados => {
            setPost(dados.data);
            
            limparCampo();
        })
        .catch(err => console.error(err));
      }
      const token = localStorage.getItem('token-edux');
      

      const salvar = (event) => {
        event.preventDefault();
     
        const posts = {
            texto : texto,
            idUsuario : idUsuario,
            urlImagem : urlImagem
        }

        
        fetch(url + '/post', {
            method : 'POST',
            body : JSON.stringify(posts), 
            headers : {
                
                'authorization' : 'Bearer ' + localStorage.getItem('token-nyous-tarde')
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Post salvo');
            console.log(dados)
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
        
        fetch(`${url}/upload`,
        {
            method : 'POST',
            body : formdata,
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(data =>{
            console.log(data)
            setUrlImagem(data.url);
        })
        .catch(err => console.error(err))
    }
    const limparCampo = () => {
        setId(0);
        setTexto('');
        setIdUsuario('');
        setUrlImagem('');
    }
    
    
        return (
            <div>
                
    
    
        
        <Menu />
        <Jumbotron className="text-center">
                <h1>Timeline</h1>
                
            
            </Jumbotron>

            <Container>

                <Card>
                    <Card.Body>
         <Form onSubmit={event => salvar(event)}>
            <Form.Group controlId="formDescricao">
                            <Form.Label>Texto</Form.Label>
                            <Form.Control as="textarea" placeholder='Digite Aqui' rows={2} value={texto} onChange={event => setTexto(event.target.value)}   />
                           
                        </Form.Group>
                        <Form.Control as="select" size="lg" custom defaultValue={idUsuario} onChange={event => setIdUsuario(event.target.value)} >
                                    <option value={0}>Selecione</option>
                                    {
                                       usuario.map((item, index) => {
                                            return(
                                                <option key={index} value={item.id}>{item.nome}</option>
                                            )
                                        })
                                    }
                                    
                                </Form.Control>
                        <Form.Group controlId="formNome">
                                <Form.File id="fileCategoria" label="Imagem do Post"  onChange={event => uploadFile(event)} />
                                { urlImagem && <img src={urlImagem} style={{ width : '160px'}} />}
                            </Form.Group>
                            <Button type="submit" style={{marginBottom : '15px'}}>Postar</Button>
                            </Form>
                            </Card.Body>
                            </Card>
            </Container>

        <Jumbotron className="text-center" >
            <h1>Posts</h1>
        </Jumbotron>
       
        <Container>
        <Row>
        {
                    post.map((item, index) => {
                        return (
                            <Col key={index} style={{alignItems : 'center', paddingTop : '25px'}} xs='5'>
                                <Card>
                                <Card.Body>
                                    <Card.Title style={{textAlign : 'left'}}>{item.usuario.nome}</Card.Title>
                        <Card.Text>{item.texto}</Card.Text>
                        
                                    
                                    </Card.Body>
                                    <Card.Img variant="top" src={urlImagem}/>
                                    
                                  
                                </Card>
                            </Col>
                        )
                    })
                }


            </Row>
        </Container>
        
      

            <br></br>
        <Rodape />
            </div>
        
    )

}
export default TimelineA;