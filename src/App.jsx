import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import PokemonDetailPage from './Pages/PokemonDetailPage';




function App() {
  

  return (
  <BrowserRouter>
   <Routes>
    <Route path='/' element={<HomePage/>} />
    <Route path='/details/:name' element={<PokemonDetailPage/>} />
   </Routes>
   </BrowserRouter>
  )
}

export default App
