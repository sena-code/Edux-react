import React from 'react';
import { Carousel, Jumbotron, Button, Card, Col, Container, Row } from 'react-bootstrap';
import Menu from '../../components/menu/index';
import wallpaper from '../../assets/img/5.jpg';
import Rodape from '../../components/rodape/index'

const Home = () => {
    return(
        <div>
        <Menu />
        <Carousel>
            <Carousel.Item>
            <img src={wallpaper} alt="Edux Wallpaper" style={{height : '400px', width : '1600px'}} />
            </Carousel.Item>
        </Carousel>
        <Jumbotron className="text-center">
                <h1>Plataforma pensada em todos os alunos e professores</h1>
                <p>
                    Entre no seu perfil para começar
                </p>
                <p>
                    <Button variant="primary" href='/login'>Login</Button>
                </p>
            </Jumbotron>
            <Container>
            <Row className="text-center">
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://github.githubassets.com/images/modules/open_graph/github-mark.png" />
                        <Card.Body>
                            <Card.Title>Tecnologias</Card.Title>
                            <Card.Text>  
                            GitHub is a development platform inspired by the way you work. From open source to business, you can host and review code, manage projects, and build software alongside 50 million developers.
                            </Card.Text>
                            <Button href = 'https://github.com/' variant="primary">Acesse agora</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://promoblack.proenem.com.br/static/3628069461c1ad2a7c13cd65e7296c41/de22e/leonardo.png" />
                        <Card.Body>
                            <Card.Title>Educação</Card.Title>
                            <Card.Text>
                            Conheça a história dos nossos ProAlunos que conseguiram excelentes vagas nas melhores universidades públicas do país e nos cursos de seus sonhos!

                            </Card.Text>
                            <Button href = 'https://promoblack.proenem.com.br/' variant="primary">Acesse agora</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="" />
                        <Card.Body>
                            <Card.Title>Analise Comportamental</Card.Title>
                            <Card.Text>
                            Quer saber qual animal representa sua personalidade no ciclo social e profissional?
                            </Card.Text>
                            <Button href = 'https://www.ibccoaching.com.br/portal/comportamento/analise-comportamento-teste-perfil-comportamental/#:~:text=Para%20ilustrar%20isso%2C%20s%C3%A3o%20evocados,o%20Lobo%2C%20o%20indiv%C3%ADduo%20organizado.' variant="primary">Acesse agora</Button>
                        </Card.Body>
                    </Card>
                </Col>       
            </Row>
            </Container>

            <Rodape />
        </div>
    )
}
export default Home;