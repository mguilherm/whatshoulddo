import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './home.css';

import { auth } from '../../firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function Home(){

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  async function handleLogin(e){
    e.preventDefault();

    if(email !== '' && password !== ''){
      await signInWithEmailAndPassword(auth, email, password)
      .then(()=>{
        navigate('/admin', {replace: true})
      })
      .catch( (err)=>{
        console.log(`something got wrong, error code: ${err}`)
      })
    
    } else{
      alert('Ops, parece que você não digitou todas as informações corretamente, vamos tentar novamente?')
    }
    return
  }


    return(
      <div className='home--container flex--centralized'>
          <h1>What <span id='brandmark' className='highlighted--color'>Should</span> Do</h1>
          <p className='color--lighter'>Organize suas tarefas do dia a dia de forma simples.</p>

        <form className='form' onSubmit={handleLogin}>
          <input 
            type='email' 
            placeholder='Digite seu email'
            value={ email }
            onChange={ (e)=> setEmail(e.target.value) }
          />
          <input 
            type='password' 
            autoComplete= 'false'
            placeholder='Digite sua senha'
            value={ password }
            onChange={ (e)=> setPassword(e.target.value) }
          />

          <button type='submit'>ENTRAR</button>
        </form>
        <Link to={'/registro'}>Não possui uma conta? <span className='text--decoration'>Cadastre-se aqui.</span></Link>
      </div>
    )
  }