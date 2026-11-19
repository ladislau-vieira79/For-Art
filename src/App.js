
import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Carregamento from './components/Carregamento/Carregamento';
import Explorar from './pages/Explorar/Explorar';
import Galerias from './pages/Galerias/Galerias';
import Sobre from './pages/Sobre/Sobre';
import Home from './pages/home/Home'
import Cadastro from './components/Cadastro/Cadastro'
import Login from './components/login/Login'
import Artistas from './pages/Artistas/Artistas'
import PerfilGaleria from "./pages/Galerias/PerfilGaleria/PerfilGaleria";
import Mensagens from "./pages/Mensagens/Mensagens";
import Obra from "./pages/Obra/Obra";
import PublicarObra from "./pages/PublicarObra/PublicarObra";
import Notificacoes from "./pages/Notificacoes/Notificacoes";
import PerfilArtistas from "./pages/PerfilArtistas/PerfilArtistas";
import Feed from './pages/Feed/Feed'
 


function App() {
  return (
    <div className="App">
     
      <BrowserRouter  basename={process.env.PUBLIC_URL}>
       <Carregamento/> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Galerias" element={<Galerias />} />
          <Route path="/Feed" element={<Feed />} />
          <Route path="/Explorar" element={<Explorar />} />
          <Route path="/Sobre" element={<Sobre />} />
          <Route path="/Artistas" element={<Artistas />} />
          <Route path="/mensagens" element={<Mensagens />} />
          <Route path="/artista/:id" element={<PerfilArtistas />} />
          <Route path="/galeria/:id" element={<PerfilGaleria />} />
          <Route path="/obra/:id" element={<Obra />} />
          <Route path="/publicar" element={<PublicarObra />} />
          <Route path="/notificacoes" element={<Notificacoes />} />
          <Route path="/Cadastro" element={<Cadastro />} />
          <Route path="/Login" element={<Login />} />
        </Routes>

  
      </BrowserRouter>
     

    </div>
  )
}

export default App;
