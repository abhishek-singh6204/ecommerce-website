
import { Link } from 'react-router';
import './login.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loginuser } from '../../store/authSlice';
import toast from 'react-hot-toast';
export default function LoginPage() {
        const dispatch=useDispatch();
       let initialState={
            username:"",
            password:""
        }
        let [formdata,setFormdata]=useState(initialState);
        function handleChange(e){
        //    console.log(e.target.value);
        
           setFormdata(prev=>({
            ...prev,
            [e.target.name]:e.target.value
           })) 
        }
        function handleclick(e){
            e.preventDefault();
            dispatch(Loginuser(formdata)).then((data)=>{
                if (data?.payload?.success) {
                 toast.success("Sucessfully logged in")
            } else {
                setFormdata({
                    username: "",
                    password: ""
                });
                 toast.error(data?.payload?.message);
            }
            })
        }
        
  
        
  return (
    <>
    <form >
        <div className="flex flex-col loginform">
            <h1 className="text-center font-bold h1" style={{fontSize:"27px"}}>Sign in your Account</h1>
           
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name='username' value={formdata.username} onChange={handleChange} placeholder="Enter username" required/>
            
                <label htmlFor="password">password</label>
                <input type="password" id="password" name='password' value={formdata.password} onChange={handleChange} placeholder="enter password" required/>

              <span className="text-center" style={{fontSize:"15px", color:"gray"}}>Donot have Account <Link to={"/auth/signup"} className='font-bold text-black'> Signup</Link> </span>
           
            <button type='submit' className='lgbtn' onClick={handleclick}>login</button>
        </div>
    </form>
    </>
    );
}
