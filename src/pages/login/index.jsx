import React, {useState} from 'react';
import Menu from '../../components/menu/';
import Rodape from '../../components/rodape/index';
import {Container, Form, Button} from 'react-bootstrap';
import logo from '../../assets/img/logo_branco_2-8.png';
import {url} from '../../utils/constants';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import './index.css'

const Login = () => {

    let history = useHistory();
    const [Email, setEmail] = useState('');
    const [Senha, setSenha] = useState('');

  

    const logar = (event) => {
        event.preventDefault();
        
        const login = {
            email : Email,
            senha : Senha
        }

        fetch(`${url}/Login`,{
            method : 'POST',
            body : JSON.stringify(login),
            headers : {
                'content-type' : 'application/json'
            }
        })
        .then(response => {
            //Verifia a resposta da api
            if(response.ok){
                return response.json();
            }

            //Caso não retorne Ok mostra um alert
            alert('Dados inválidos')
        })
        .then(data => {
            console.log(data);

            localStorage.setItem('token-edux', data.token)
            const token = localStorage.getItem('token-edux')

            let usuario = jwt_decode(token);

            console.log(usuario);

            if(usuario.role == 'Administrador'){
                history.push('/admin/timeline');
            }else if(usuario.role == 'Comum'){
            history.push("/comum/timeline")
            }
        })
        .catch(err => console.error(err))
    

    }
    return(
        <div>
    <Menu />
        <Container>
        <Form className='form-signin' onSubmit={event => logar(event)} >
                    <div className='text-center'>
                     <img src={logo} alt='Edux' style={{ width : '64px'}} />
                    </div>
                    <br/>
                    <small>Informe os dados Abaixo</small>
                    <hr/>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email </Form.Label>
                        <Form.Control type="email" placeholder="Informe o email" value={Email} onChange={event => setEmail(event.target.value)}  required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Senha" value={Senha} onChange={event => setSenha(event.target.value)} required/>
                    </Form.Group>
                    <Button variant="primary" type="submit" >
                        Enviar
                    </Button>
                  
                </Form>
        </Container>

    <Rodape /> 
    </div>
    )
}
export default Login;