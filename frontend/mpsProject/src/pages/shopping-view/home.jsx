import { useEffect, useState } from 'react';
import bannerOne from '../../assets/banner-1.webp';
import bannerTwo from '../../assets/banner-2.webp';
import bannerThree from '../../assets/banner-3.webp';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';
import { Atom, BabyIcon, Baseline, CloudLightningIcon, Crown, Globe, LayoutGrid, Shell, ShirtIcon, UmbrellaIcon, WatchIcon } from 'lucide-react';
import { Card, CardContent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilteredProducts, getProductDetailes } from '@/store/shopProductSlice';
import { useNavigate } from 'react-router';
import ProductTile from '@/component/shopping-view/productTile';
import { addToCart, getCartItems } from '@/store/cartSlice';
import ProductDetails from '@/component/shopping-view/productDetail';
import { getFeature } from '@/store/common';
import toast from 'react-hot-toast';
import CartItemsContent from '@/component/shopping-view/cart-items-content';
export default function ShoppingHome() {
    const { featureItems } = useSelector(state => state.feature);
    const [current, setCurrent] = useState(0);
    const slides = [];
    featureItems.map((item) => slides.push(item.image));
    // console.log(slides);
    const { shopProductList, productDetails } = useSelector(state => state.shopProducts);
    const { user } = useSelector(state => state.auth);
    const [openDetailsDialog, setOpenDetailedDialog] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector(state => state.cartProducts || []);

    const category = [
        { id: "men", label: "Men", icon: ShirtIcon },
        { id: "women", label: "Women", icon: CloudLightningIcon },
        { id: "kids", label: "Kids", icon: BabyIcon },
        { id: "accessories", label: "Accessories", icon: WatchIcon },
        { id: "footware", label: "Footware", icon: UmbrellaIcon },
    ];
    const brand = [
        { id: "nike", label: "Nike", icon: Atom },
        { id: "puma", label: "Puma", icon: Crown },
        { id: "adidas", label: "Adidas", icon: LayoutGrid },
        { id: "levi", label: "Levi", icon: Globe },
        { id: "zara", label: "Zara", icon: Baseline },
        { id: "h&m", label: "H&M", icon: Shell },
    ];
    function nextSlide() {
        setCurrent(current === slides.length - 1 ? 0 : current + 1);
    }
    function prevSlide() {
        setCurrent(current === 0 ? slides.length - 1 : current - 1);
    }
    function handleFilter(id, filterScheme) {
        localStorage.removeItem('filters');
        const currentFilters = {
            [filterScheme]: [id]
        }
        // console.log(currentFilters);
        sessionStorage.setItem("filters", JSON.stringify(currentFilters));
        navigate('/shop/listings');
    }
    // console.log(productDetails, 'productdetails');
    function handleAddToCart(productId, stock) {
        // console.log(productId);
        // console.log(user.id, user.username);
        const getItems = cartItems;
        console.log(getItems);
        if (getCartItems.length) {
            const productIndex = getItems.findIndex(indx => indx.productId._id === productId);
            if (productIndex > -1) {
                const getQuantity = getItems[productIndex].quantity;
                if (getQuantity + 1 > stock) {
                    toast.error(`you can add ${stock} items`);
                    return;
                }

            }
        }
        dispatch(addToCart({ userId: user.id, productId: productId, quantity: 1 })).then((data) => {
            if (data?.payload?.success) {
                toast.success("Added to cart");
                dispatch(getCartItems(user?.id)).then((data) => {
                    console.log(data);
                })
            }
        })
    }
    //  function handleDetailed(id) {
    //     console.log(id);
    //         dispatch(getProductDetailes(id));
    // }

    function handleDetailed(id) {
        // console.log(id);
        dispatch(getProductDetailes(id));
    }
    useEffect(() => {
        if (productDetails !== null) setOpenDetailedDialog(true);
    }, [productDetails])
    useEffect(() => {
        dispatch(fetchFilteredProducts({
            filterparams: {}, sortparams: {}
        }))
    }, [dispatch])
    useEffect(() => {
        dispatch(getFeature()).then((data) => {
            console.log(data);
        })
    }, [dispatch]);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 3000); // auto-advance every 5 seconds

        return () => clearInterval(interval); // cleanup on unmount
    }, [slides.length]);
    return (
        <div className='flex flex-col '>
            <div className='relative w-full h-[500px] overflow-hidden'>
                {featureItems.length > 0 && featureItems.map((item, indx) => current === indx && (
                    <img src={item.image} alt="slider image" className='h-full w-full absolute top-0 left-0 object-cover' />
                ))
                }
                <Button className='absolute top-1/2 left-4 ' variant='outlined' style={{ padding: "0px", minWidth: "30px", minHeight: "60px" }} onClick={() => prevSlide()}><ArrowBackIosNewIcon style={{ fontSize: "35px" }} /></Button>
                <Button className='absolute top-1/2 right-4 ' variant='outlined' style={{ padding: "0px", minWidth: "30px", minHeight: "60px", position: "absolute" }} onClick={() => nextSlide()}><ArrowForwardIosIcon style={{ fontSize: "35px" }} /></Button>

            </div>
            <section className='abcde bg-gray-50' >
                <div className=" " style={{ padding: "30px 0px", margin: "auto" }}>
                    <h2 className='text-3xl font-bold text-center ' style={{ marginBottom: "30px" }}>Shop By Category</h2>
                    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4' >
                        {category.map(item =>
                            <Card className='cursor-pointer hover:shadow-sm' onClick={() => handleFilter(item?.id, "category")}>
                                <CardContent className='flex flex-col items-center' style={{ padding: "25px" }}>
                                    <item.icon className='text-primary h-12 w-12 ' style={{ marginBottom: "20px" }} />
                                    <span className='text-lg'>{item.label}</span>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </section>
            <section className='abcde bg-gray-50' style={{ padding: "20px 0px" }}>
                <div className=" " style={{ padding: "30px 0px", margin: "auto" }}>
                    <h2 className='text-3xl font-bold text-center ' style={{ marginBottom: "30px" }}>Shop By Brand</h2>
                    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 justify-center' >
                        {brand.map(item =>
                            <Card className='cursor-pointer hover:shadow-sm' onClick={() => handleFilter(item?.id, 'brand')}>
                                <CardContent className='flex flex-col items-center' style={{ padding: "25px" }}>
                                    <item.icon className='text-primary h-12 w-12 ' style={{ marginBottom: "20px" }} />
                                    <span className='text-lg'>{item.label}</span>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </section>


            <section className='abcde bg-gray-50' style={{ padding: "20px 0px" }}>
                <div className=" " style={{ padding: "30px 0px", margin: "auto" }}>
                    <h2 className='text-3xl font-bold text-center ' style={{ marginBottom: "30px" }}>Feature Products</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                        {shopProductList && shopProductList.length > 0 && shopProductList.map(item =>
                            <div className="flex justify-center">
                                <ProductTile
                                    key={item.id}
                                    product={item}
                                    handleAddToCart={handleAddToCart}
                                    handleDetailed={handleDetailed}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <ProductDetails openProduct={openDetailsDialog} setOpenProduct={setOpenDetailedDialog} productDetails={productDetails} handleAddToCart={handleAddToCart} />
        </div>
    );
}