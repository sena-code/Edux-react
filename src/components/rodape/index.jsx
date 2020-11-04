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
            <a href="https://www.facebook.com/campaign/landing.php?&campaign_id=1661784632&extra_1=s%7Cc%7C320269324047%7Ce%7Cfacebook%7C&placement=&creative=320269324047&keyword=facebook&partner_id=googlesem&extra_2=campaignid%3D1661784632%26adgroupid%3D63686352403%26matchtype%3De%26network%3Dg%26source%3Dnotmobile%26search_or_content%3Ds%26device%3Dc%26devicemodel%3D%26adposition%3D%26target%3D%26targetid%3Dkwd-541132862%26loc_physical_ms%3D1001773%26loc_interest_ms%3D%26feeditemid%3D%26param1%3D%26param2%3D&gclid=CjwKCAiAv4n9BRA9EiwA30WND-u2q5stDzUESh4-CGfejIgH5ElkaRbKZD7WbifErfK60l5RcXYzxhoCfoIQAvD_BwE"><img src={facebook} alt="Facebook" style={{height : '41,5px', width : '41,5px'}} /></a>
            <a href="https://twitter.com/login?lang=pt><img src={twitter}"><img src={twitter} alt="Twitter" style={{height : '37px', width : '37px'}} /></a>
        </footer>
    )
}

export default Rodape;
