import React, {useState, useEffect} from 'react';
import { Container, Form, Button, Card, Table } from 'react-bootstrap';
import {url} from '../../../utils/constants'
import Menu from '../../../components/menu/index';
import Rodape from '../../../components/rodape/index';
import Titulo from '../../../components/titulo/index';

const CrudInstituicao = () => {
    const [id, setId] = useState(0);
    const [nome, setNome] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [cep, setCep] = useState('');
    const [uf, setUf] = useState('');
    const [instituicoes, setInstituicao] = useState([]);
    
    useEffect(() => {
        listarInstituicao();
    }, [])
  
    const listarInstituicao = () => {
        fetch(`${url}/Instituicao`,{
            headers : {
                        
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
        }
                
           
        })
        .then(response => response.json())
        .then(dados => {
           
            setInstituicao(dados.data);
            console.log(dados.data);
        })
        .catch(err => console.error(err));
    }

     //Metodo para limpar o campo do formulario após o professor ter salvo uma instituiçao
     const limparCampo = () =>{
            setId(0);
            setNome('');
            setLogradouro('');
            setNumero('');
            setComplemento('');
            setBairro('');
            setCidade('');
            setCep('');
            setUf('');
     }
     
     //Metodo para excluir uma Instituicao
     const remover = (event) => {
        event.preventDefault();

        fetch(url + '/Instituicao/' + event.target.value,{
            method : 'DELETE',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(data => {
            alert('Instituicao excluida');

            listarInstituicao();
        })
     }
    
     //Metodo para adicionar uma Instituicao
     const adicionar = (event) =>{
        event.preventDefault();

        const instituicao = {
            nome : nome,
            logradouro : logradouro,
            numero : numero,
            complemento : complemento,
            bairro : bairro,
            cidade : cidade,
            cep : cep,
            uf : uf
        }

        let method = (id === 0 ? 'POST' : 'PUT');
        let urlRequest = (id === 0 ? `${url}/Instituicao` :  `${url}/Instituicao/${id}`);

         fetch(urlRequest ,{
             method : method,
             body : JSON.stringify(instituicao),
             headers : {
                'content-type' : 'application/json',
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
             }
         }) 
         .then(response => response.json())
         .then(dados => {
             alert('Instituicao cadastrada');
 
             listarInstituicao();
         })

     }
     //Metodo para editar uma Instituicao
     const editar = (event) =>{
         event.preventDefault();

         fetch(url + '/Instituicao/' + event.target.value, {
            method : 'GET',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(dado => {
            setId(dado.id);
            setNome(dado.nome);
            setLogradouro(dado.logradouro);
            setNumero(dado.numero);
            setComplemento(dado.complemento);
            setBairro(dado.bairro);
            setCidade(dado.cidade);
            setCep(dado.cep);
            setUf(dado.uf);
        })
    }
     
      return(<div>
            
        <Menu />
        <Titulo titulo="Instituições" chamada="Gerencie suas instituições"/>
        <Container>
            

            <Card>
                    <Card.Body>
                    <Form onSubmit={event => adicionar(event)}>
                        
                        <Form.Group controlId="formNome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control as="textarea" rows={3} value={nome} onChange={event => setNome(event.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formLogradouro">
                            <Form.Label>Logradouro</Form.Label>
                            <Form.Control as="textarea" rows={3} value={logradouro} onChange={event => setLogradouro(event.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formNome">
                            <Form.Label>Numero</Form.Label>
                            <Form.Control as="textarea" rows={3} value={numero} onChange={event => setNumero(event.target.value)} />
                        </Form.Group>
                        
                        
                        <Form.Group controlId="formNome">
                            <Form.Label>Complemento</Form.Label>
                            <Form.Control as="textarea" rows={3} value={complemento} onChange={event => setComplemento(event.target.value)} />
                        </Form.Group>
                        
                        <Form.Group controlId="formNome">
                            <Form.Label>Bairro</Form.Label>
                            <Form.Control as="textarea" rows={3} value={bairro} onChange={event => setBairro(event.target.value)} />
                        </Form.Group>
                        
                        <Form.Group controlId="formNome">
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control as="textarea" rows={3} value={cidade} onChange={event => setCidade(event.target.value)} />
                        </Form.Group>
                        
                        <Form.Group controlId="formNome">
                            <Form.Label>CEP</Form.Label>
                            <Form.Control as="textarea" rows={3} value={cep} onChange={event => setCep(event.target.value)} />
                        </Form.Group>
                        
                        <Form.Group controlId="formNome">
                            <Form.Label>UF</Form.Label>
                            <Form.Control as="textarea" rows={3} value={uf} onChange={event => setUf(event.target.value)} />
                        </Form.Group>
                       

                        <Button type="submit" >Adicionar</Button>
                    </Form>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                    <Table bordered>
                        <thead>
                            <tr>
                               
                                <th>Id</th>
                                
                                <th>Nome</th>

                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                instituicoes.map((item, index) => {
                                return (
                                    <tr key={index}>

                                        <td>{item.id}</td>
                                <td>{item.instituicoes =  instituicoes.map((item, index) => {
                                        return (
                                            <option key={index} value={item.instituicoes}>{item.nome}</option>
                                        )
                                    })}</td>
                                      
                                        <td>
                                            <Button type="button" variant="warning" value={item.id} onClick={ event => editar(event)}>Editar</Button>
                                            <Button type="button" variant="danger" value={item.id} style={{ marginLeft : '10px'}} onClick={ event => remover(event)}>Remover</Button>
                                        </td>
                                    </tr>
                                )
                                })
                            }
                        </tbody>
                    </Table>
                    </Card.Body>
                </Card>
        </Container>
       

        <Rodape />
    </div>)
  }

  export default CrudInstituicao;