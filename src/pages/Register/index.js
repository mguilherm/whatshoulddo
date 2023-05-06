
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { auth } from '../../firebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth'


export default function Register(){

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  async function handleRegister(e){
    e.preventDefault();

    if(email !== '' && password !== ''){
      await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/admin', { replace: true })
      })
      .catch((err) => {
        console.log(`something got wrong with register process. Error code: ${err}`)
      })
      
     
    } else{
      alert('Parece que você não digitou todas as informações corretamente, vamos tentar novamente?')
    }
    return
  }


    return(
      <div className='home--container flex--centralized'>
          <h1> <span id='brandmark' className='highlighted--color'>Cadastre-se</span></h1>
          <p className='color--lighter'>Vamos criar sua conta!</p>

        <form className='form' onSubmit={handleRegister}>
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

          <button type='submit'>CRIAR CONTA</button>
        </form>
        <Link to={'/'}>Já possui cadastro? <span className='text--decoration'>Faça seu login.</span></Link>
      </div>
    )
  }