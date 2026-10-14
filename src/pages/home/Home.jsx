import NavBar from '../../components/Layout/NavBar/NavBar'
import Footer from '../../components/Layout/Footer'
import Carrossel from '../../pages/Carrossel/Carrossel';
import Categorias from '../../components/Categorias/Categorias'
import Funcionamento from '../../components/Funcionamento/Funcionamento'
import SeccaoCadastro from '../../components/SeccaoCadastro/SeccaoCadastro'
import ObrasDestaque from '../../components/ObrasDestaque/ObrasDestaque'
import Faq from '../../components/FAQ/Faq'


function Home(){
    return(
        <div>
            <NavBar/>
            <Carrossel/>
            <Categorias/>
            <ObrasDestaque/>
            <Funcionamento/>
            <Faq/>
            <SeccaoCadastro/>
            <Footer/>
            
        </div>
        
    )
}

export default Home