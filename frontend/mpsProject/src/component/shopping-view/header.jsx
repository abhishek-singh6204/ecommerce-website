import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import HouseIcon from '@mui/icons-material/House';
import MenuIcon from '@mui/icons-material/Menu';
import { userHeadingData } from '../data/header'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import './header.css'
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import { Logout } from '../../store/authSlice';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import CartWrapper from './cart-wrapper';
import { getCartItems } from '@/store/cartSlice';
import { Label } from '@radix-ui/react-label';
// import {user} from 

function NavLinks() {
    const navigate=useNavigate();
    const location=useLocation();
    const [searchParams,setSearchParams]=useSearchParams();
    function handleNavClick(nav){
        console.log(nav);
        sessionStorage.removeItem("filters")
        const currentFilter=nav.id!=='home' && nav.id!=='products' && nav.id!=='search'? {
            category:[nav.id]
        }:null
        sessionStorage.setItem('filters',JSON.stringify(currentFilter))
        location.pathname.includes("listings") && currentFilter!==null ? 
        setSearchParams(new URLSearchParams(`?category=${nav?.id}`)) :
        navigate(nav.path);
    }
    return (
        userHeadingData.map((nav) => (
            // console.log(nav)
            <Label onClick={()=>handleNavClick(nav)} className='text-lg font-medium cursor-pointer' key={nav.id} >{nav.label}</Label>
        ))
    );
}
function NavLink({ istoggleheader, setIstoggleHeader }) {
    return (
        userHeadingData.map((nav) => (
            // console.log(nav)
            <Link to={nav.path} className='text-lg font-medium ' key={nav.id} onClick={(() => setIstoggleHeader(!istoggleheader))}>{nav.label}</Link>
        ))
    );
}

export default function ShoppingHeader() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const [openCartSheet, setOpenCartSheet] = useState(false);
    const  {cartItems} = useSelector(state => state.cartProducts || []);

    // console.log(user);
    // abc.map((a)=>{
    //     a.onClick(()=>{
    //         setIstoggleHeader(!istoggleheader);
    //     })
    // })
    function handleShopClick() {
        setOpenCartSheet(true);
        // navigate("/shop/checkout");
    }
    const [istoggleheader, setIstoggleHeader] = useState(false);
    if (istoggleheader) {
        let abc = document.querySelectorAll(".toggleHeader a");
        console.log(abc)
    }
    useEffect(()=>{
        dispatch(getCartItems(user?.id));
    },[dispatch])
    // console.log(cartItems,"cartitems");
    return (
        <>
            <header className="w-full bg-white sticky top-0 shadow-md z-40 px-4" style={{ padding: "5px 30px" }}>
                <div className="flex items-center justify-between w-full">
                    <Link className='flex items-center py-3' to={"/shop/home"} style={{ fontSize: "30px ", fontWeight: "bolder" }}>
                        {/* <HouseIcon style={{height:"40px", fontSize:"40px"}}/> */}
                        <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/online-store-logo%2C-e-commerce-logo-%283%29-design-template-5fc3de145150d7e9581f8ba1a6d3e122_screen.jpg?ts=1686243660" alt="ecommerce logo" style={{ height: "70px", width: "70px" }} />
                        <span style={{ margin: "0px" }}>Ecommerce</span>
                    </Link>
                    <div className='hidden md:flex  justify-between gap-4 '>
                        <NavLinks />
                    </div>
                    <div className='md:hidden block cursor-pointer' onClick={() => setIstoggleHeader(!istoggleheader)}>
                    <Sheet open={istoggleheader} onOpenChange={() => setIstoggleHeader(!istoggleheader)}>

                        <MenuIcon />
                        <SheetContent side='left' className={'w-[250px]'}>
                            <div className="toggleHeader shadow-lg">

                    <button style={{ textAlign: "right", display: "flex", justifyContent: "flex-end", background: "transparent" }}>
                        <CloseIcon style={{ padding: "5px", borderRadius: "50px", backgroundColor: "gray", fontSize: "40px" }} onClick={() => setIstoggleHeader(!istoggleheader)} />
                    </button>

                    <div className='flex flex-col gap-5'>
                        <NavLink setIstoggleHeader={setIstoggleHeader} istoggleheader={istoggleheader} />
                        <div className='nav-icons-profile flex flex-col gap-5 ' >
                            <div onClick={()=>{handleShopClick(),setIstoggleHeader(!istoggleheader)}}>
                                <span style={{ fontSize: "18px ", fontWeight: "bold", margin: "0px 10px 0px 0px" }}>Cart</span>
                                <ShoppingCartIcon className='cursor-pointer' />
                            </div>
                            <div className='flex items-center avtar' style={{ position: "relative" }}>

                                <Avatar
                                    sx={{ bgcolor: deepOrange[500] }}
                                    alt="Remy Sharp"
                                    src="/broken-image.jpg"
                                    className='cursor-pointer'
                                >
                                    {user.username[0].toUpperCase()}
                                </Avatar>

                                <div className='shadow-md aboutProfile' style={{ width: "200px", position: "absolute", top: "40px", right: "-30px", display: "flex", flexDirection: "column", padding: "10px 10px", backgroundColor: "white", display: "none" }}>
                                    <div>
                                        <p style={{ fontWeight: "bold" }}>Logged in as: {user.username}</p>
                                    </div>
                                    <div className='flex gap-2 items-center' style={{ cursor: "pointer", margin: "10px 0px" }} onClick={() =>{ navigate("/shop/account"),setIstoggleHeader(!istoggleheader)}}>
                                        <PersonAddAltIcon />
                                        <span style={{ margin: "0px" }}> Account</span>
                                    </div>
                                    <div className='flex gap-2 items-center' style={{ cursor: "pointer", margin: "0px 0px 0px 0px" }} onClick={() => dispatch(Logout())}>
                                        <LogoutIcon />
                                        <span style={{ margin: "0px" }}> Logout</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                        </SheetContent>
                        </Sheet>
                    </div>
                    <div className='hidden nav-icons-profile md:flex gap-2 items-center' >
                        <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
                            <div className='relative' style={{padding:"3px"}}>
                            <ShoppingCartIcon className='cursor-pointer relative' onClick={() => handleShopClick()} />
                            <span className='absolute top-[-7px] right-[0] text-sm font-bold'>{cartItems.length}</span>
                            </div>
                            <CartWrapper cartItems={cartItems} setOpenCartSheet={setOpenCartSheet}/>
                        </Sheet>
                        <div className='flex items-center avtar' style={{ position: "relative" }}>

                            <Avatar
                                sx={{ bgcolor: deepOrange[500] }}
                                alt="Remy Sharp"
                                src="/broken-image.jpg"
                                className='cursor-pointer'
                            >
                                {user?.username[0].toUpperCase()}
                            </Avatar>

                            <div className='shadow-md aboutProfile' style={{ width: "200px", position: "absolute", top: "0px", right: "40px", display: "flex", flexDirection: "column", padding: "10px 10px", backgroundColor: "white", display: "none" }}>
                                <div>
                                    <p style={{ fontWeight: "bold" }}>Logged in as: {user.username}</p>
                                </div>
                                <div className='flex gap-2 items-center' style={{ cursor: "pointer", margin: "10px 0px" }} onClick={() => navigate("/shop/account")}>
                                    <PersonAddAltIcon />
                                    <span style={{ margin: "0px" }}> Account</span>
                                </div>
                                <div className='flex gap-2 items-center' style={{ cursor: "pointer", margin: "0px 0px 0px 0px" }} onClick={() => dispatch(Logout())}>
                                    <LogoutIcon />
                                    <span style={{ margin: "0px" }}> Logout</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


            </header>
           
        </>
    );
}