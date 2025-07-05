import { Fragment } from "react";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CloseIcon from '@mui/icons-material/Close';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import './header.css'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router";

export default function Adminsidebar({ isopen, setOpen }) {
    const navigate = useNavigate();
    function handleclick(dest) {
        // setOpen(!isopen);
        navigate(dest)
    }
    return (
        <Fragment>

            <aside className="w-64 flex flex-col  bg-background p-6  lg:flex shadow-lg">
               
                    <CloseIcon className="closebtn" onClick={()=>setOpen(!isopen)}/>
      
               
                <div className="flex items-center gap-2">
                    <PersonOutlineIcon />
                    <p className="adminPanel">Admin Panel</p>

                </div>
                <div className="admin-wrapper ">
                    <div className="flex items-center gap-2" onClick={() => handleclick("/admin/dashboard")}>
                        <DashboardIcon />
                        <p className="">Dashboard</p>

                    </div>
                    <div className="flex items-center gap-2" onClick={() => handleclick("/admin/products")}>
                        <ShoppingBasketIcon />
                        <p className="">Products</p>

                    </div>
                    <div className="flex items-center gap-2" onClick={() => handleclick("/admin/order")}>
                        <MyLocationIcon />
                        <p className="">Orders</p>

                    </div>

                </div>
            </aside>
        </Fragment>
    );
}