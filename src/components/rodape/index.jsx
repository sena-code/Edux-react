import React from 'react';
import instagram from '../../assets/img/Instagram.jpg';
import facebook from '../../assets/img/facebook.jpg';
import twitter from '../../assets/img/twitter.jpg';
import edux from '../../assets/img/logo_branco_2-8.png';


const Rodape = () => {
    return (
        <footer className="text-center" style={{ marginTop : '70px', backgroundColor : 'black', color : 'white', height : '550px'}}>
            <img src={edux} style={{width : '200px', paddingTop : '45px'}} alt='Logo Edux'/>
            <br></br>
          <div style={{ flexDirection : 'row', justifyContent : 'center', padding : '25px', listStyle : 'none'}}>
          <ul style={{listStyle : 'none'}}>
          <li >Desenvolvido por <a  style={{color : 'gray'}} href="https:/github.com/sena-code">Vinicius Sena</a></li> <br></br>
            <li>Desenvolvido por <a style={{color : 'gray'}} href="https://github.com/Gustavo-oficial">Gustavo Felix</a></li> <br></br>
            <li>Desenvolvido por <a style={{color : 'gray'}} href="https://github.com/LaisMaas">Lais Maas</a></li> <br></br>
            <li>Desenvolvido por <a style={{color : 'gray'}} href="https://github.com/felipemendesvidal">Felipe Vidal</a></li> <br></br>
            <li>Desenvolvido por <a style={{color : 'gray'}} href="https://github.com/https://github.com/Pamsg">Pedro Antônio</a></li>
          </ul>
          <small>™ & © 2020 Projeto Edux, Inc.  Projeto Edux and a, Inc.  All Rights Reserved.</small>
          </div>
            <br></br>
          
        </footer>
    )
}

export default Rodape;
