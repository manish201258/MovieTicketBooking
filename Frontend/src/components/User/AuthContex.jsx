import React, { createContext, useContext, useState,useEffect } from 'react';
import Cookies from 'js-cookie';
import base_url from './Baseurl';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [popup1, setPopup1]=useState('hide')
const [popup2, setPopup2]=useState('hide')
const [user,setUser] = useState(null)
const [loading,setLoading] = useState(true)

  // Check if token exists on mount
  useEffect(() => {
    const tokenExist = Cookies.get('token');
    setIsLoggedIn(!!tokenExist);
    if(tokenExist){
      userDTA()
    }
  }, []);

  const login = (token) => {
    Cookies.set('token', token, { expires: 30, secure: true });
    setIsLoggedIn(true);
    userDTA()
  };
  const register = (token) => {
    Cookies.set('token', token, { expires: 30, secure: true });
    setIsLoggedIn(true);
    userDTA()
  };
  const logout = () => {
    Cookies.remove('token');
    setUser(null)
    setIsLoggedIn(false);
    userDTA()
  };
  // formPopuo
  const popupToggle1 = () => {
    if (popup2 === 'show') {
      setPopup2('hide');
    }
    setPopup1(prevState => prevState === 'hide' ? 'show' : 'hide');
  };

  const popupToggle2 = () => {
    if (popup1 === 'show') {
      setPopup1('hide');
    }
    setPopup2(prevState => prevState === 'hide' ? 'show' : 'hide');
  };
// close form popup
const closePopup = () =>{
  if (popup1 === 'show'||popup2 === 'show') {
    setPopup1('hide');
    setPopup2('hide');
  }
}

// User Data Authentication]

const userDTA = async () => {
  try {
    const token = Cookies.get('token');
    const response = await fetch(`${base_url}/api/auth/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      const data = await response.json();
      setUser(data);
    }
  } catch (error) {
    console.log("error in data fetch", error);
  }finally{
    setLoading(false)
  }
};

  return (
  <AuthContext.Provider value={{ isLoggedIn, login, logout,register, popupToggle1,popupToggle2,popup1,popup2,closePopup,user,loading,userDTA }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
