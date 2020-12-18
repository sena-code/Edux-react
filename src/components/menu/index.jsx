import React from 'react';
import { Navbar, Nav, NavDropdown, Dropdown, DropdownButton, Button } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/img/logo_branco_2-8.png';




  

const Menu = () => {

   
    const history = useHistory();
    const sair = (event) => {
        event.preventDefault();

        localStorage.removeItem('token-edux');

        history.push('/');
    }
    const renderMenu = () => {
        const token = localStorage.getItem('token-edux')

        console.log(token);

        if(token === null){
            return (
                <Nav>
                   <Button href="/login" variant="success">Login</Button>{' '}
                    
                </Nav>
            );
        } else if( jwt_decode(token).role === "Administrador"){
            return (
                <Nav >
                   <Button href="/comum/timeline" style={{marginRight: '15px'}} variant="success"  >Timeline</Button>
                   <Button href="/comum/rank" style={{marginRight: '15px'}} variant="success"  >Ranking</Button>
                   <Button href="/admin/informacoes" style={{marginRight: '15px'}} variant="success"  >Informações</Button>
                    <DropdownButton id="dropdown-basic-button" variant="success" title="Cadastrar">
                    <Dropdown.Item href="/admin/crudcursos">Curso</Dropdown.Item>
                    <Dropdown.Divider />
                    
                   
                    
                    <Dropdown.Item href="/admin/crudobjetivos">Objetivo</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="/admin/crudobjetivosA">Objetivo Aluno</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="/admin/crudprofessores">Professor em turma</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="/admin/crudturmas">Turma</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="/admin/crudusuarios">Usuário</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="/admin/crudinstituicao">Instituição</Dropdown.Item>
                   
                  
                    </DropdownButton>
                    <DropdownButton id="dropdown-basic-button" variant="danger" style={{paddingLeft : '15px'}} title={jwt_decode(token).nameid }>
                    <Dropdown.Item onClick={ event => sair(event)} href="#/action-1">Sair</Dropdown.Item>
                     
                    </DropdownButton>
                    
                    
                </Nav>
            )
        } else {
            return (
                <Nav>
                    <Button href="/comum/timeline" style={{marginRight: '15px'}} variant="success"  >Timeline</Button>
                    <Button href="/comum/objetivo" style={{marginRight: '15px'}} variant="success"  >Objetivos</Button>
                    <Button href="/comum/objetivoA" style={{marginRight: '15px'}} variant="success"  >Seus Objetivos</Button>
                    
                    <Button href="/comum/rank" style={{marginRight: '15px'}} variant="success"  >Ranking</Button>
                    <DropdownButton id="dropdown-basic-button" variant="danger" style={{paddingLeft : '15px'}} title={jwt_decode(token).nameid }>
                    <Dropdown.Item onClick={ event => sair(event)} href="#/action-1">Sair</Dropdown.Item>
                    </DropdownButton>
                </Nav>
            )
        }
    }
    return (
        <Navbar style={{backgroundColor : '#1b1b1b'}}  expand="lg">
            <Navbar.Brand href="/"></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/"><img
                    src={logo} alt='Edux'
                    style={{ width : '54px'}}
                    /></Nav.Link>
                </Nav>
               
                { renderMenu() }
            </Navbar.Collapse>
        </Navbar>
    )
}


export default Menu;