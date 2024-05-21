import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({children}) {
const[isLoggedIn,setIsloggedIn] = useState(false)
const navigate=useNavigate()

const getUserOnLoad = async (email) => {
    const response = await fetch(`http://localhost:5000/users?email=${email}`, {
      method: "GET",
    });
    if (response.ok) {
      const userFromServer = await response.json();
      if(userFromServer.length>0){
        setIsloggedIn(true)
    } else{
            setIsloggedIn(false)
            navigate('/login')
        }
    } else {
      console.log("Something went wrong");
    }
  };
useEffect(() => {
    let localUser = localStorage.getItem("toDoUser");
    if (localUser) {
      const userFromLocal = JSON.parse(localUser);
      getUserOnLoad(userFromLocal.email)
    } else {
       setIsloggedIn(false)
       navigate('/login')
    }
  }, []);


    return (
        isLoggedIn?children:null
    );
}

export default ProtectedRoute;