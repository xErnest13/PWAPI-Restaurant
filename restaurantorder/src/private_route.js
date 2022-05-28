import React, { useState, useEffect}  from "react";
import { Route, Navigate , useLocation } from "react-router-dom";
import useLoggedIn from "./user.component";






function isLogin(user = null) {
    //if(user){
    //  return false;
    //}
    if (localStorage.getItem("currentUser") === "null") {
      return false;
    }
    return true;
  }

  


  
const PrivateRoute =  ({ children }) => {

    let location = useLocation();
  const [toCheck, settoCheck] = useState(false);
  const {status, data} = useLoggedIn('/authentication/user/current/');
  let user = null;

  useEffect(()=>{
    console.log("Sefule", status, data);

  },[data])

   
  
  return  isLogin === false ?  (<Navigate to="/login" />) :(children) ;
    
};
  
export default PrivateRoute;