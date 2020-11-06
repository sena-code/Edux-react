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
      const [curtida, setCurtida] = React.useState(0);
      const token = localStorage.getItem('token-edux');
     

      useEffect(() => {
        listarPost();
        listarUsuario();
    }, [])

     const listarUsuario = () => {
        fetch(`${url}/Usuario`)
        .then(response => response.json())
        .then(dados => {
            setUsuario(dados);
            
            limparCampo();
        })
        .catch(err => console.error(err));
      }

      const listarPost = () => {
        fetch(`${url}/Post`, {
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(dados => {
            setPost(dados.data);
            console.log(dados.data);
            
           <div>
           <h3>{curtida} Curtidas</h3>
           <button onClick={Curtida} style ={{ background:'green', color:'white'}} >Curtir</button>
           </div>
               
            limparCampo();
        })
        .catch(err => console.error(err));
      }
      

      const salvar = (event) => {
        event.preventDefault();

      
      
        const posts = {
            texto : texto,
            idUsuario : idUsuario,
            urlImagem : urlImagem
        }

        
        let method = (id === 0 ? 'POST' : 'PUT');
        let urlRequest = (id === 0 ? `${url}/Post` :  `${url}/Post/${id}`);

        fetch(urlRequest, {
            method : method,
            body : JSON.stringify(posts), 
            headers : {
                'content-type' : 'application/json',
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
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

     function Curtida () {
         setCurtida (anterior => anterior + 1)
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
                                        return (
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
                                <Col key={index} style={{alignItems : 'center', paddingTop : '25px', paddingBottom : '55px'}} xs='8'>
                                    <Card>
                                    <Card.Body>
                                        <Card.Title style={{textAlign : 'left'}}>{item.usuario.nome}</Card.Title>
                            <Card.Text>{item.texto} </Card.Text>
                            
                                        
                                        </Card.Body>
                                        <Card.Img variant="top" src={item.urlImagem}/>
                                        
                                        <p style={{textAlign : 'center'}}>{curtida} Curtidas</p>
           <button onClick={Curtida} style ={{ background:'green', color:'white', height : '35px'}} >Curtir</button>
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