import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import PokemonCard from './Components/PokemonCard';



function App() {
  

  return (
  <BrowserRouter>
   <Routes>
    <Route path='/' element={<HomePage/>} />
   </Routes>
   </BrowserRouter>
  )
}

export default App
