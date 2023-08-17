import React from 'react'
import Styles from "./Login.module.css"
import { useState, useEffect } from 'react';
import { useAutenticacao } from '../../hooks/useAutenticacao';
const Login = () => {


  const [email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const [error, setError] = useState('')

  const {login, error: authError, loading} = useAutenticacao();

const handleSubmit = async (e) => {
  e.preventDefault()

  setError('')
  const user ={
    email,
    password
  }


  const res = await login(user)

  console.log(res)
}
useEffect (() => {
if(authError){
  setError (authError);
}
},[authError])


  return (
    <div className={Styles.login}>
           <h1>Entrar</h1>
      <p>Faça o login para utilizar o sistema</p>
      <form onSubmit={handleSubmit}>

        <label>
          <span>E-mail:</span>
          <input type="email" name='email' required placeholder='Endereço de e-mail' autoComplete='on' /* Pegando valor do input*/  value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <span>Senha:</span>
          <input type="password" name='password' required placeholder='Insira sua senha' /* Pegando valor do input*/ value={password} onChange={(e) => setPassword (e.target.value)} />
        </label>
       {!loading && <button className='btn'>Entrar</button>}
       {loading && <button className='btn' disabled>aguarde...</button> }
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default Login