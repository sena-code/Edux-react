import React from 'react';
import { Carousel, Jumbotron, Button } from 'react-bootstrap';
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


            <Rodape />
        </div>
    )
}
export default Home;