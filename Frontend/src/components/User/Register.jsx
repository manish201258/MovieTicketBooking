import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from './AuthContex';
import base_url from './Baseurl';
import { toast } from 'react-toastify';

const Register = () => {
const {register,closePopup,popupToggle2} = useAuth()

const [user, setUser] = useState({
  username:"",
  email:"",
  phone:"",
  password:""
});


const handleInput=(e)=>{
  
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
    const response = await fetch(`${base_url}/api/auth/register`,
      {method:"POST",
    
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify(user),
    })
    
    if(response.status==201){
      const res_data = await response.json()
      register(res_data.token)

setUser({
  username:"",
  email:"",
  phone:"",
  password:""
});
closePopup()
toast("Register Success")

    }
   else if(response.status===400){
      toast("Email Exist!")
    }

  } catch (error) {
    console.log("server error")
  }
}
  return (
    <>
      <div className="signup">
            <div className="heading">
                <h3>Sign Up</h3>
                <button onClick={closePopup} className="cross-popup">
                  <img src="\images\cross.png" alt="" />
                </button>
            </div>
                <form className="inputsection"  onSubmit={handleSubmit} action="">

                <input type="text"  placeholder="Name*" value={user.username}
                onChange={handleInput} name='username' required minLength="4"
                />
                <input type="email"  placeholder="Email*"name='email'
                value={user.email}
                onChange={handleInput} required pattern="^[a-zA-Z0-9._%+-]+@gmail\.com$" size="30"
                onInvalid={(e) => e.target.setCustomValidity('Please enter a valid Gmail address.')}
        onInput={(e) => e.target.setCustomValidity('')}
                />
                <input type="number" placeholder="Mobile Number*"name='phone' required
                minLength="10" maxLength="10"
                value={user.phone}
                onChange={handleInput}/>
                <input type="password" placeholder="Password*"name='password' required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                onInvalid={(e) => e.target.setCustomValidity('Invalid Password Fromat!')}
                onInput={(e) => e.target.setCustomValidity('')}
                value={user.password}
                onChange={handleInput}/>
                <button type="submit" className="btn btn-primary "style={{width:"60%"}}>Register</button>
                <p>Already have an account?
                    <NavLink onClick={popupToggle2}>
                    Login
                    </NavLink>
                    </p>
                </form>
              
        </div>
    </>
  )
}

export default Register