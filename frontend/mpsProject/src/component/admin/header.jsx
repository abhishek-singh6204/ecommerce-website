import './header.css'
import {AlignJustify} from 'lucide-react'
import LogoutIcon from '@mui/icons-material/Logout';
import {Button} from '@mui/material'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Logout, resetTokenAndCredentials } from '../../store/authSlice';
export default function AdminHeader({isopen,setOpen}){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    function handleClick(){
        console.log(setOpen(!isopen));
    }
    function handleLogout(){
            dispatch(resetTokenAndCredentials());
            sessionStorage.clear();
            navigate('/auth/login')
    }
    return(
       <header  className="flex items-center  backgeound-black shadow-lg px-4 py-2" style={{padding:"25px "}}>
        <h2 className='ecommerceLogo text-xl font-bold'>Ecommerce-App</h2>
        <Button variant='outlined' className='togglerButton' onClick={()=>setOpen(!isopen)}> <AlignJustify /></Button>
        <div className='flex flex-1 justify-end'>
            <Button variant="contained" className='background-black' style={{display:"flex",backgroundColor:"gray "}} onClick={handleLogout}><LogoutIcon />Logout</Button>
        </div>
       </header>
    );
}