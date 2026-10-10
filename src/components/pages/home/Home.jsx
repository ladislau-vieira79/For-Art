import NavBar from '../../Layout/NavBar/NavBar'
import Footer from '../../Layout/Footer'
import Carrossel from '../../pages/Carrossel/Carrossel';
import Categorias from '../../Categorias/Categorias'
import Funcionamento from '../../Funcionamento/Funcionamento'
import SeccaoCadastro from '../../SeccaoCadastro/SeccaoCadastro'
import ObrasDestaque from '../../ObrasDestaque/ObrasDestaque'
import Faq from '../../FAQ/Faq'


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