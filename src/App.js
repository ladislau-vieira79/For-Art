
import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Carregamento from './components/Carregamento/Carregamento';
import Explorar from './components/pages/Explorar/Explorar';
import Galerias from './components/pages/Galerias/Galerias';
import Sobre from './components/pages/Sobre/Sobre';
import Home from './components/pages/home/Home'
import Cadastro from './components/Cadastro/Cadastro'
import Login from './components/login/Login'
import Artistas from './components/pages/Artistas/Artistas'
import Feed from './components/pages/Feed/Feed'


function App() {
  return (
    <div className="App">
     
      <BrowserRouter>
       <Carregamento/> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Galerias" element={<Galerias />} />
          <Route path="/Feed" element={<Feed />} />
          <Route path="/Explorar" element={<Explorar />} />
          <Route path="/Sobre" element={<Sobre />} />
          <Route path="/Artistas" element={<Artistas />} />
          <Route path="/Cadastro" element={<Cadastro />} />
          <Route path="/Login" element={<Login />} />
        </Routes>

  
      </BrowserRouter>
     

    </div>
  )
}

export default App;
