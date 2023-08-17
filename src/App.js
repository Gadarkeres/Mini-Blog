import './App.css';
// hooks
import { onAuthStateChanged  } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useAutenticacao } from './hooks/useAutenticacao';
// React Router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//context
import {AuthProvider} from './context/AuthContext'
//pages
import Home from './pages/Home/Home';
import Sobre  from './pages/Sobre/Sobre';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Login from './pages/Login/Login';
import Registrar from './pages/Registrar/Registrar';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {

  const [user, setUser] = useState(undefined)
  const {auth} = useAutenticacao()

  const loadingUser = user === undefined;

  useEffect (() =>{
    
    onAuthStateChanged(auth, (user) =>{
      setUser(user)
    })
   
    }, [auth])


  if(loadingUser){
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
   <AuthProvider value={{user}}>
   <BrowserRouter>
      <Navbar/>
      <div className="container">
        
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Sobre" element={<Sobre/>}/>
      <Route path="/Login" element={!user ? <Login/> : <Navigate to="/"/>}/>
      <Route path="/Registrar" element={!user ? <Registrar/> : <Navigate to="/"/>}/>
      <Route path="/posts/create" element={user ? <CreatePost/> : <Navigate to="/login"/>}/>
      <Route path="/dashboard" element={user ? <Dashboard/> : <Navigate to="/login"/>}/>
      
      </Routes>
      
      </div>
      <Footer/>
      </BrowserRouter>
   </AuthProvider>
    </div>
  );
}

export default App;
