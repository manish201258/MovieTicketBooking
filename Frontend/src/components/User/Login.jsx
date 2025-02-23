import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContex'
import base_url from './Baseurl'
import { toast } from 'react-toastify';

const Login = () => {

  const {popupToggle1} = useAuth()

  const {login,closePopup} = useAuth()
  const [user , setUser] = useState({
    email:"",
    password:""
  })

  
  const handleInput=(e)=>{
    // this for dynamic value
  let name = e.target.name;
  let value = e.target.value;
  
  setUser({
    ...user,
    [name]:value
  })
  }


  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const response = await fetch(`${base_url}/api/auth/login`,
        {method:"POST",
      
        headers:{
          'Content-Type':"application/json",
        },
        body:JSON.stringify(user),
      })
      if(response.status==200){
        const res_data = await response.json()
        login(res_data.token)
        closePopup()
        toast("Login Success")
      }
      else if(response.status==401){
        toast("Invalid Credential")
      }
      else if(response.status==403){
       toast("You have been Blocked By Admin! Contact to Admin")
      }
  
    } catch (error) {
      console.log("server error")
    }
  }
  return (
    <>
    <div>
    </div>
    <div className="cont11">
    <div className="log">
    <div className="login displaynone">
            <div className="heading">
                <h3>Login</h3>
                <button onClick={closePopup} className="cross-popup">
                  <img src="\images\cross.png" alt="" />
                </button>
            </div>
            <form className="inputsection" onSubmit={handleSubmit}>
                <input type="text" placeholder="Email*"required
                name='email'value={user.email} onChange={handleInput}
                />
                <input type="text" placeholder="Password*"required
                name='password'value={user.password} onChange={handleInput}
                />
                <button type='submit' className="btn btn-primary "style={{width:"60%",marginTop:"12px"}}
                >Login</button>
                <p>Don't have an account?
                    <NavLink onClick={popupToggle1}>
                    Sign up
                    </NavLink>
                    </p>
            </form>
        </div>
    </div>
    </div>
    </>
  )
}

export default Login