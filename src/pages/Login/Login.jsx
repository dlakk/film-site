import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
// import { login, signup} from '../../firebase'

const Login = () => {
  const [signState, setSignState] = useState("Sign In")// initialize the state eith sign in 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

//authentication function
  const user_auth = async (event) =>{
    event.preventDefault();//webpage will not reload whenever we submit the form
    if(signState === "Sign In"){
      await login(email, password);
    }else{
      await signup(name,email,password);
    }
  }


  return (
    <div className='login'>
      {/* <img src={logo} alt="" className='login-logo'/> */}
      <div className="login-form">
        <h1>{signState}</h1>
        <form action="" method="get">
          {signState==="Sign Up"?
          <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" name="" id="" placeholder='Your name' />:<></>}
          
          <input  value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" name="" id="" placeholder='Email' />
          <input  value={password} onChange={(e)=>{setPassword(e.target.value)}}  type="password" name="" id="" placeholder='Password' />
          <button onClick={user_auth} type='submit'>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" name="" id="" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">

          {signState==="Sign In"?
          <p>New to Netflix? <span onClick={()=>{setSignState("Sign Up")}}>Sign Up Now</span></p>:
          <p>Already have an account? <span onClick={()=>{setSignState("Sign In")}}>Sign In Now</span></p>}
          
          
        </div>
      </div>
    </div>
  )
}

export default Login