import React from 'react';
import instagram from '../../assets/img/Instagram.jpg';
import facebook from '../../assets/img/facebook.jpg';
import twitter from '../../assets/img/twitter.jpg';


const Rodape = () => {
    return (
        <footer className="text-center" style={{ marginTop : '70px'}}>
            <h1>Projeto Edux</h1>
            <br></br>
            <p >Desenvolvido por <a href="https:/github.com/sena-code">Vinicius Sena</a></p> <br></br>
            <p>Desenvolvido por <a href="https://github.com/Gustavo-oficial">Gustavo Felix</a></p>  <br></br>
            <p>Desenvolvido por <a href="https://github.com/felipemendesvidal">Felipe Vidal</a></p> <br></br>
            <p>Desenvolvido por <a href="https://github.com/https://github.com/Pamsg">Pedro Antônio</a></p>
            <br></br>
            <a href="https://www.instagram.com/"><img src={instagram} alt="Instagram" style={{height : '40px', width : '40px'}} /></a>   
            <a href=""><img src={facebook} alt="Facebook" style={{height : '41px', width : '41px'}} /></a>
            <a href="https://twitter.com/login?lang=pt"><img src={twitter} alt="Twitter" style={{height : '37px', width : '37px'}} /></a>
        </footer>
    )
}

export default Rodape;
