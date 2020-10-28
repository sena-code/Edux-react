import React, {useState, useEffect} from 'react';
import {url} from '../../../utils/constants'
import { Carousel, Jumbotron, Button, Card, Row, Col, Container } from 'react-bootstrap';
import Menu from '../../../components/menu/index';
import Rodape from '../../../components/rodape/index'

const Timeline = () => {

    
   
        const [id, setId] = useState(0);
        const[Texto, setTexto] = useState('');
        const[IdUsuario, setIdUsuario] = useState(0);
        const[UrlImagem, setUrlImagem] = useState('');
        const[Imagem, setImagem] = useState('');
        const [dicas, setDicas] = useState([]);
    
        useEffect(() => {
            listarDicas();
        },[])
    
        const listarDicas = () => {
            fetch(`${url}/Dica`,{
             data: JSON.stringify(),
                contentType: "application/json; charset=utf-8",
            headers : {
                'content-type' : 'application/json'
            }
            })
            .then(response => response.json())
            .then(dados => {
                setUrlImagem(dados.data.data)
                setIdUsuario(dados.data.data)
                setId(dados.data.data)
                setTexto(dados.data.data)
                setImagem(dados.data.data)
                setDicas(dados.data.data);
                
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
        
        </Jumbotron>

        
                <Carousel>
                    {
                        dicas.map((item, index) => {
                            return (
                                <Carousel.Item>
                                    <img
                                    className="d-block w-100"
                                    src={item.UrlImagem}
                                    alt="First slide"
                                    style={{ height : '650px'}}
                                    />
                                    <Carousel.Caption>
                                    <h3>{item.nome}</h3>
                                    <p>{item.descricao}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )
                        })
                    }
                </Carousel>
        

        </div>
    )

}
export default Timeline;