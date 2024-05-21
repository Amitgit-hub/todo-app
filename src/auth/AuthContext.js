import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { createContext } = require("react");

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  // to redirect promgramatically using a hook useNavigate
  const navigate = useNavigate();

  //register function

  const register = async (formData) => {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const checkUser = await fetch(
      `http://localhost:5000/users?email=${formData.email}`,
      { method: "GET" }
    );
    if (checkUser.ok) {
      let user = await checkUser.json();
      if (user.length > 0) {
        setMessage("User already exist, Please Login");
      } else {
        const response = await fetch("http://localhost:5000/users", config);
        if (response.status === 201) {
          let user = await response.json();
          localStorage.setItem("toDoUser", JSON.stringify(user));
          setUser(user);
          setMessage("Registered Succesfully");
          setTimeout(() => {
            navigate("/task-list");
          }, 3000);
        } else {
          setMessage("Something went wrong, please try again");
        }
      }
    } else {
      setMessage("something went wrong");
    }
  };

  //login function
  const login = async (formData) => {
    const response = await fetch(
      `http://localhost:5000/users?email=${formData.email}&password=${formData.password}`,
      { method: "GET" }
    );

    if (response.ok) {
      let users = await response.json();
      if (users.length > 0) {
        localStorage.setItem("toDoUser", JSON.stringify(users[0]));
        setUser(users[0]);
        setMessage("Logged in Successfully");
        setTimeout(() => {
          navigate("/task-list");
        }, 3000);
      } else {
        setMessage("Email/Password incorrect");
      }
    } else {
      setMessage("Something went wrong, please try again");
    }
  };

  //check user in databse
  const getUserOnLoad = async (email) => {
    const response = await fetch(`http://localhost:5000/users?email=${email}`, {
      method: "GET",
    });
    if (response.ok) {
      const userFromServer = await response.json();
      if(userFromServer.length>0){
          setUser(userFromServer[0]);
        } else{
            localStorage.removeItem("toDoUser")
            navigate('/login')
        }
    } else {
      console.log("Something went wrong");
    }
  };
  //get user from local storage
  useEffect(() => {
    let localUser = localStorage.getItem("toDoUser");
    if (localUser) {
      const userFromLocal = JSON.parse(localUser);
      getUserOnLoad(userFromLocal.email);
    } else {
        navigate('/login')
    }
  }, []);

  //removing the user data from local storgae and user state
  const logout= ()=>{
    localStorage.removeItem("toDoUser")
    setUser(null)
    navigate('/login')
  }
  return (
    <AuthContext.Provider
      value={{ register, message, setMessage, login, user,logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
