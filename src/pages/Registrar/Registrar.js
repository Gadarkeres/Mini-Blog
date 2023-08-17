import React from 'react'
import Styles from "./Registrar.module.css";
import { useState, useEffect } from 'react';
import { useAutenticacao } from '../../hooks/useAutenticacao';

const Registrar = () => {
  const [displayname, setDisplayname] = useState('')
  const [email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const {createUser, error: authError, loading} = useAutenticacao();



const handleSubmit = async (e) => {
  e.preventDefault()

  setError('')
  const user ={
    displayname,
    email,
    password
  }
  if(password !== confirmPassword){
    setError('As senhas precisam ser iguais.')
    return
  }

  const res = await createUser(user)

  console.log(res)
}
useEffect (() => {
if(authError){
  setError (authError);
}
},[authError])


  return (
    <div className={Styles.register}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas historias!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input type="text" name='displayName' required  placeholder='Nome do usuário' /* Pegando valor do input*/ value={displayname} onChange={(e) => setDisplayname (e.target.value)} />
        </label>
        <label>
          <span>E-mail:</span>
          <input type="email" name='email' required placeholder='Endereço de e-mail' autoComplete='on' /* Pegando valor do input*/  value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <span>Senha:</span>
          <input type="password" name='password' required placeholder='Insira sua senha' /* Pegando valor do input*/ value={password} onChange={(e) => setPassword (e.target.value)} />
        </label>
        <label>
          <span>Confirmação de senha:</span>
          <input type="password" name='confirmPassword' required placeholder='Confirme a sua senha' /* Pegando valor do input*/ value={confirmPassword} onChange={(e) => setConfirmPassword (e.target.value)} />
        </label>
       {!loading && <button className='btn'>Cadastrar</button>}
       {loading && <button className='btn' disabled>aguarde...</button> }
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default Registrar