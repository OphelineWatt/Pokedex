import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import PokemonDetailPage from './Pages/PokemonDetailPage';
import NavBar from './Components/NavBar';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';
import TeamPage from './Pages/TeamPage';




function App() {
  

  return (
  <BrowserRouter>
  <NavBar/>
   <Routes>
    <Route path='/' element={<HomePage/>} />
    <Route path='/details/:name' element={<PokemonDetailPage/>} />
    <Route path='/register' element={<RegisterPage/>} />
    <Route path='/login' element={<LoginPage/>} />
    <Route path='/profile' element={<ProfilePage/>} />
    <Route path='/team' element={<TeamPage/>} />
   </Routes>
   </BrowserRouter>
  )
}

export default App
