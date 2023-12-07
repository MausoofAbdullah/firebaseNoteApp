import React, { useState } from "react";
import {auth} from '../firebase_config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db } from '../firebase_config';
import { addDoc, collection } from "firebase/firestore";


function RegisterAndLogin() {
  const [login, setLogin] = useState(false);
  const noteRef =  collection(db, "users")

  const history = useNavigate();

  const handleSubmit = (e, type) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const fullname=e.target.name.value
    if (type == "signup") {
      createUserWithEmailAndPassword(auth, email, password)
        .then((data) => {
          console.log(data, "authData");
        const user={id:data.user.uid,email: data.user.email,name:fullname}
        addDoc(noteRef,user)
          .then((res)=>{
            console.log(res,"check")
              history("/home");
          })

        })
        .catch((err) => {

          alert(err.message);
          setLogin(true);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((data) => {
          console.log(data, "authData");
          history("/home");
        })
        .catch((err) => {
            console.log(err.message,"errr")
          alert(err.message);
        });
    }
  };
 

  
  return (
    <div className="">
      {/* Registration and login Screen */}
      <div className="row">
        <div
          className={login == false ? "activeColor" : "pointer"}
          onClick={() => setLogin(false)}
        >
          SignUp
        </div>
        <div
          className={login == true ? "activeColor" : "pointer"}
          onClick={() => setLogin(true)}
        >
          SignIn
        </div>
      </div>
      <h1>{login ? "SignIn" : "SignUp"}</h1>
      <form onSubmit={(e) => handleSubmit(e, login ? "signin" : "signup")}>
      {!login && <input name="name" placeholder="Full Name" />}
        <input name="email" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        
       
        <br />
        <button>{login ? "SignIn" : "SignUp"}</button>
      </form>
    </div>
  );
}
export default RegisterAndLogin;