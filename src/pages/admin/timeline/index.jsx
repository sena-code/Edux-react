import React, {useState, useEffect} from 'react';
import {url} from '../../../utils/constants'
import { Carousel, Jumbotron, Button, Card, Row, Col, Container, Table } from 'react-bootstrap';
import Menu from '../../../components/menu/index';
import Rodape from '../../../components/rodape/index'

const Timeline = () => {

        const [dicas, setDicas] = useState([]);
        const [objetivos, setObjetivo] = useState([]);
        const [turmas, setTurma] = useState([]);
        const[Idcategoria, setIdCategoria] = useState('');
        const [categorias, setCategorias] = useState([]);
        const[Idcurso, setIdcurso] = useState('');
        const[cursos, setCursos] = useState([]);
        const[objetivoA, setObjetivoA] = useState([]);
        const[nota, setNota] = useState(0)
       
        useEffect(() => {
            listarDicas();
            listarObjetivos();
            listarTurmas();
            listarCategoria();
            listarCursos();
            listarObjetivoA();
        },[])
    
        const listarDicas = () => {
            fetch(`${url}/Dica`,{
                headers : {
                        
                        
                            
                    'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
                
            }
                    
               
            })
            .then(response => response.json())
            .then(dados => {
               
                setDicas(dados.data);
                console.log(dados.data);
            })
            .catch(err => console.error(err));
        }
        const listarObjetivos =() => {
            fetch(`${url}/Objetivo`, {
                headers : {
                        
                        
                            
                    'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
         })
            .then(response => response.json())
            .then(dados => {
                setObjetivo(dados.data);
                console.log(dados.data);
            })
            .catch(err => console.error(err));
        }
        const listarTurmas =() => {
            fetch(`${url}/Turma`, {
                headers : {
                        
                        
                            
                    'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
         })
            .then(response => response.json())
            .then(dados => {
                setTurma(dados.data);
                console.log(dados.data);
            })
            .catch(err => console.error(err));
        }
        
        const listarCategoria = () => {
            fetch(`${url}/Categoria`,{
                headers : {
                        
                        
                            
                    'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
                
            }
                    
               
            })
            .then(response => response.json())
            .then(dados => {
               
                setCategorias(dados.data);
                console.log(dados.data);
            })
            .catch(err => console.error(err));
        }

        const listarCursos = () => {
            fetch(`${url}/Curso`,{
                headers : {
                        
                        
                            
                    'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
                
            }
                    
               
            })
            .then(response => response.json())
            .then(dados => {
               
                setCursos(dados.data);
                console.log(dados.data);
            })
            .catch(err => console.error(err));
        }

        const listarObjetivoA = () => {
            fetch(`${url}/ObjetivoAluno`,{
                headers : {
                        
                        
                            
                    'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
                
            }
                    
               
            })
            .then(response => response.json())
            .then(dados => {
               
                setObjetivoA(dados.data);
                setNota(dados.data);
                console.log(dados.data);
            })
            .catch(err => console.error(err));
        }
      
        return (
            <div>
                
    
    
        
        <Menu />
        <Jumbotron className="text-center">
                <h1>Portal do Professor</h1>
                <p>
                  Bem vindo ao portal do professor
                </p>
            
            </Jumbotron>

        <Carousel>
            <Carousel.Item>
            <img src="https://www.jornaldebarueri.com.br/wp-content/uploads/2019/03/jornal-barueri-site-21.jpg" alt="Edux Wallpaper" style={{height : '700px', width : '1600px'}} />
            </Carousel.Item>
           
        </Carousel>
        <Jumbotron className="text-center">
            <h1>Dicas</h1>
            <p>Todas as dicas dadas ao seus estudantes estão aqui.  </p>
            <p>Caso queira adicionar uma dica</p>
            <Button href='/admin/cruddicas' variant="primary">Adicionar</Button>{' '}
            
        </Jumbotron>
        <Container>
        <Row>
                


                {
                    dicas.map((item, index) => {
                        return (
                            <Col key={index} xs='4'>
                                <Card>
                                    <Card.Img variant="top" src={item.urlImagem}/>
                                    <Card.Body>
                                    <Card.Title style={{textAlign : 'center'}}>{item.texto}</Card.Title>
                                    
                                    </Card.Body>
                                  
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
        <Jumbotron className="text-center">
            <h1>Objetivos</h1>
            <p>Todas os objetivos dados ao seus estudantes estão aqui.  </p>
            <p>Caso queira adicionar um objetivo</p>
            <Button href='/admin/crudobjetivos' variant="primary">Adicionar</Button>{' '}
            
        </Jumbotron>
        <Container>
            {
                objetivos.map((item, index) => {
                    return(

                        <Table key={index}  striped bordered hover>
                            <thead>
                                <tr>
                                
                                <th>Objetivos</th>
                               
                               
                                </tr>
                         </thead>
                        <tbody >
                        <tr >
                        
                    <td>{item.descricao}</td>
                
                  
                    
                     
                    
                        
                        </tr>
                        </tbody>
                        </Table>
                    )
                })
            }
        </Container>
        <Jumbotron className="text-center">
            <h1>Turmas</h1>
            <p>Todas as turmas apareceram aqui.  </p>
            <p>Caso queira adicionar uma nova turma</p>
            <Button href='/admin/crudturmas' variant="primary">Adicionar</Button>{' '}
            
        </Jumbotron>
        <Container>
            {
                turmas.map((item, index) => {
                    return(

                        <Table key={index} striped bordered hover>
                            <thead>
                                <tr>
                                
                                <th>Turma</th>
                                 
                               
                                </tr>
                         </thead>
                        <tbody >
                        <tr >
                        
                    <td>{item.descricao}</td>
                
                    
                        
                        </tr>
                        </tbody>
                        </Table>
                    )
                })
            }
            </Container>
            <Jumbotron className="text-center">
            <h1>Cursos</h1>
            <p>Todas os cursos apareceram aqui.  </p>
            <p>Caso queira adicionar um novo curso</p>
            <Button href='/admin/crudcursos' variant="primary">Adicionar</Button>{' '}
            
        </Jumbotron>
        <Container>
            {
                cursos.map((item, index) => {
                    return(

                        <Table  key={index} striped bordered hover>
                            <thead>
                                <tr>
                                
                                
                                <th>Curso</th>
                               
                                </tr>
                         </thead>
                        <tbody >
                        <tr >
                        
                    <td>{item.titulo}</td>
                    
                    
                        
                        </tr>
                        </tbody>
                        </Table>
                    )
                })
            }
            </Container>

            <Jumbotron className="text-center">
            <h1>Objetivos Alunos</h1>
            <p>Todos os objetivos dos alunos apareceram aqui.  </p>
            <p>Caso queira adicionar um professor a uma turma</p>
            <Button href='/admin/crudObjetivosA' variant="primary">Adicionar</Button>{' '}
            </Jumbotron>

            <Container>
            {
                objetivoA.map((item, index) => {
                    return(

                        <Table  key={index} striped bordered hover>
                            <thead>
                                <tr>
                                
                                <th>Id Aluno Turma</th>
                                <th>Nota</th>
                                <th>Data Alcançada</th>
                               
                                </tr>
                         </thead>
                        <tbody >
                        <tr >
                    <td>{item.idAlunoTurma}</td>
                    <td>{item.nota}</td>
                    <td>{item.dataAlcancada}</td>
                    
                    
                        
                        </tr>
                        </tbody>
                        </Table>
                    )
                })
            }
            </Container>

            <br></br>
        <Rodape />
            </div>
        
    )

}
export default Timeline;