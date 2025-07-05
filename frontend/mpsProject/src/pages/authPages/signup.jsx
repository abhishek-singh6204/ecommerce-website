import { Link, Navigate, useNavigate } from 'react-router';
import './login.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { Registeruser } from '../../store/authSlice';
import toast from 'react-hot-toast';
export default function SignupPage() {
    const navigate = useNavigate();
    let initialState = {
        username: "",
        email: "",
        password: ""
    }
    let [formdata, setFormdata] = useState(initialState);
    const dispatch = useDispatch();
    function handleclick(e) {
        //  console.log(Registeruser);
        e.preventDefault();
        dispatch(Registeruser(formdata)).then((data) => {
            // console.log(data);
            if (data?.payload?.success) {
                setFormdata({
                    username: "",
                    email: "",
                    password: ""
                });
                 toast.success("Account Created Sucessfully")
                navigate("/auth/login");
            } else {
                setFormdata({
                    username: "",
                    email: "",
                    password: ""
                });
                 toast.error(data?.payload?.message);
            }
        })

    }
    function handleChange(e) {
        setFormdata(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    return (
        <form>
            <div className="flex flex-col loginform">
                <h1 className="text-center font-bold h1" style={{ fontSize: "27px" }}>Create New Account</h1>


                <label htmlFor="username">Username</label>
                <input type="text" id="username" name='username' value={formdata.username} onChange={handleChange} placeholder="Enter username" required />

                <label htmlFor="email">Email</label>
                <input type="Email" id="email" name='email' value={formdata.email} onChange={handleChange} placeholder="enter email" required />

                <label htmlFor="password">password</label>
                <input type="password" id="password" name='password' value={formdata.password} onChange={handleChange} placeholder="enter password" required />

                <span className="text-center" style={{ fontSize: "15px", color: "gray" }}>Already have an account <Link to={"/auth/login"} className='font-bold text-black'> login</Link> </span>
                <button type='submit' onClick={handleclick}>Signup</button>
            </div>
        </form>
    );
}