import React, {useState, useEffect} from 'react';
import Menu from '../../../components/menu/';
import Rodape from '../../../components/rodape/index';
import {Container, Form, Button, Card} from 'react-bootstrap';
import logo from '../../../assets/img/logo_branco_2-8.png';
import {url} from '../../../utils/constants';
import Titulo from '../../../components/titulo/index';

import jwt_decode from 'jwt-decode';
import './index.css'

const Cadastro = () => {

 
 
        const [id, setId] = useState(0);
        const [nome, setNome] = useState('');
        const [email, setEmail] = useState('');
        const [senha, setSenha] = useState('');
        const [dataCadastro, setCadastro] = useState('');
        const [dataUltimoAcesso, setDataUltimoAcesso] = useState('');
        const [idPerfil, setIdPerfil] = useState('');
        const [ perfil, setPerfil] = useState([]);
        const [usuario, setUsuario] = useState([]);
        
        useEffect(() => {
            listarUsuario();
            listarPerfil();
        }, [])
      
        const listarPerfil = () => {
            fetch(`${url}/Perfil`, {
                headers : {
                    'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
                }
    
            })
            .then(response => response.json())
            .then(data => {
                setPerfil(data.data);
    
            
            })
        }
         const listarUsuario = () =>{
            fetch(`${url}/usuario`)
            .then(response => response.json())
            .then(data => {
                setUsuario(data.data);
                
                limparCampo();
            })
            .catch(err => console.error(err));
         }
         
         //Metodo para limpar o campo do formulario após o professor ter salvo um curso
         const limparCampo = () =>{
                setId(0);
                setNome('');
                setEmail('');
                setSenha('');
                setIdPerfil('');
         }
         
         //Metodo para excluir um curso
        
        
         //Metodo para adicionar um curso
         const adicionar = (event) =>{
            event.preventDefault();
    
            const cadastrar = {
                nome : nome,
                email : email,
                senha : senha,
                idPerfil : idPerfil,
                dataCadastro : dataCadastro,
                dataUltimoAcesso : dataUltimoAcesso
            }
    
          
    
             fetch(url + '/usuario' ,{
                 method : 'POST',
                 body : JSON.stringify(cadastrar),
                 headers : {
                    'content-type' : 'application/json',
                    'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
                 }
             }) 
             .then(response => response.json())
             .then(dados => {
                 alert('Usuario cadastrado');
     
                 listarUsuario();
             })
    
         }
         //Metodo para editar um curso
         const editar = (event) =>{
             event.preventDefault();
    
             fetch(url + '/Usuario/' + event.target.value, {
                method : 'GET',
                headers : {
                    'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
                }
            })
            .then(response => response.json())
            .then(dado => {
                setId(dado.id);
                setNome(dado.nome);
                setEmail(dado.email);
                setSenha(dado.senha);
                setIdPerfil(dado.idPerfil);
            })
        }
         
          return(
          <div  >
                
            <Menu />
            <Titulo titulo="Cadastro de Usuários" chamada="Cadastre Usuários"/>
            <Container>
                
    
             
                        <Form className='form-signin' onSubmit={event => adicionar(event)}>
                        <div className='text-center' >
                        <img src={logo} alt='Edux' style={{ width : '64px'}} />
                        </div>

                        <Form.Group controlId="formBasicEmail">
                        <Form.Label>Nome </Form.Label>
                        <Form.Control type="text" placeholder="Informe o Nome" value={nome} onChange={event => setNome(event.target.value)}  required />
                    </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email </Form.Label>
                        <Form.Control type="email" placeholder="Informe o email" value={email} onChange={event => setEmail(event.target.value)}  required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Senha" value={senha} onChange={event => setSenha(event.target.value)} required/>
                    </Form.Group>

                    
                            
                            <Form.Group controlId="formPerfil">
                                <Form.Label>Perfil</Form.Label>
                                <Form.Control as="select" value={idPerfil} onChange={ event => setIdPerfil(event.target.value)}>
                                    <option value={0}>Selecione</option>
                                    {
                                        perfil.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>{item.permicao}</option>
                                            )
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                                    <div className='text-center'>
                            <Button type="submit" >Adicionar</Button>
                            </div>
                  
                </Form>
               
        </Container>

    <Rodape /> 
    </div>
    )
}
export default Cadastro;