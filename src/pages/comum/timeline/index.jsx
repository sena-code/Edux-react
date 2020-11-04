import React, {useState, useEffect} from 'react';
import {url} from '../../../utils/constants'
import { Carousel, Jumbotron, Button, Card, Row, Col, Container, Table, Form } from 'react-bootstrap';
import Menu from '../../../components/menu/index';
import Rodape from '../../../components/rodape/index'



const TimelineA = () => {

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

     /* const listarUsuario = () => {
        fetch(`${url}/Usuario`)
        .then(response => response.json())
        .then(dados => {
            setUsuario(dados);
            
            limparCampo();
        })
        .catch(err => console.error(err));
      }*/

      const listarPost = () => {
        fetch(`${url}/Post`, {
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
      
        return (
            <div>
                
    
    
        
        <Menu />
        <Jumbotron className="text-center">
                <h1>Timeline do Aluno</h1>
                
            
            </Jumbotron>

            <Container>
                <Form onSubmit={event => salvar(event)}>
            <Form.Group controlId="formDescricao">
                            <Form.Label>Texto</Form.Label>
                            <Form.Control as="textarea" placeholder='Digite Aqui' rows={2} value={texto} onChange={event => setTexto(event.target.value)}   />
                        </Form.Group>
                        <Form.Group controlId="formNome">
                                <Form.File id="fileCategoria" label="Imagem do Post" onChange={event => uploadFile(event)} />
                                { urlImagem && <img src={urlImagem} style={{ width : '160px'}} />}
                            </Form.Group>
                            <Button type="submit" style={{marginBottom : '15px'}}>Postar</Button>
                            </Form>
            </Container>

        <Jumbotron className="text-center" >
            <h1>Posts</h1>
        </Jumbotron>

        <Jumbotron className="text-center" >
            <h1>Ranking</h1>
            <Card>
                    <Card.Body>
                    <Table bordered>
                        <thead>
                            <tr>
                               
                                <th>#</th>
                                
                                <th>Usuario</th>

                                <th>Conquistas ocultas</th>

                                <th>Conquistas totais</th>

                            </tr>
                        </thead>
                        <tbody>
                           
                        </tbody>
                    </Table>
                    </Card.Body>
                </Card>
        </Jumbotron>
        
        <Container>
            
        <Row>
        {
                    post.map((item, index) => {
                        return (
                            <Col key={index} style={{alignItems : 'center', paddingTop : '25px'}} xs=''>
                                <Card>
                                <Card.Body>
                                    <Card.Title style={{textAlign : 'center'}}>{item.texto}</Card.Title>
                                    
                                    </Card.Body>
                                    <Card.Img variant="top" src={item.urlImagem}/>
                                    
                                  
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