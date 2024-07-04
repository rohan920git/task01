import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss"

function Login(){
    const [email, setemail] = useState("");
    const [password, setpassword] =  useState("");
    const [error,seterror] = useState(""); 
    const [success, setsuccess] = useState("");
    const navigate = useNavigate();
   async function submitHandler(){

      if(email.length && password.length){
        try{
            const response = await fetch("https://reqres.in/api/login",{
                method:"POST",
                mode:"cors",
                headers: {
                        'Content-Type': 'application/json',
                         },
                body:JSON.stringify({email:email, password:password})
            })
            const data = await response.json();
            if(response.ok){
                setsuccess("Logged in successfully")
                localStorage.setItem("token",data?.token)
                navigate("/")
            }
            else{
                seterror(data.error)
            }

        }
        catch(err){
            console.log(err)
        }
      }
    }
    return(
        <>
        <div className="login-form">
        <form onSubmit={(e)=>{
            e.preventDefault();
            submitHandler();
        }}>
         <label htmlFor="email">Email</label>
         <input type="email" id="email" value={email}
         onChange={(e)=>setemail(e.target.value)}
         placeholder="Email"
         />
         <label htmlFor="password" >Password</label>
         <input type="password" id="password" value={password}
         onChange={(e)=>setpassword(e.target.value)}
         placeholder="Password"
         />
         
          <button type="submit" className="submit-btn">Login</button>
        </form>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        </div>
        </>
    )
}
export default Login;