import Address from '@/component/shopping-view/address';
import img from '../../assets/account.jpg'
import { useDispatch, useSelector } from 'react-redux';
import CartWrapper from '@/component/shopping-view/cart-wrapper';
import CartItemsContent from '@/component/shopping-view/cart-items-content';
import { Button } from '@mui/material';
import { useState } from 'react';
import { createNewOrder } from '@/store/orderSlice';
import toast from 'react-hot-toast';

export default function ShoppingCheckout() {
    const dispatch=useDispatch();
    const { cartItems } = useSelector(state => state.cartProducts || []);
    const { approvalURL } = useSelector(state => state.order);
    // console.log(cartItems);
    const { user } = useSelector(state => state.auth);
    const [isPaymentStart,setIsPaymentStart]=useState(false);
    const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
    const totalCartAmount = cartItems && cartItems.length > 0
        ? cartItems
            .reduce((total, item) => {
                const price =
                    item?.productId?.salePrice > 0
                        ? item.productId.salePrice
                        : item.productId.price;
                return total + price * item.quantity;
            }, 0)
        : "0.00";
    function handleCkeckoutWithPaypal() {
        if(cartItems.length<=0){
            toast.error("Your cart is empty please add items!");
            return;
        }
        
        if(currentSelectedAddress===null){
            toast.error("please select any address!");
            return;
        }
        
        const orderData = {
            userId: user?.id,
            cartId:cartItems?._id,
            cartItems: cartItems.map((item) => ({
                productId: item?.productId?._id,
                title: item?.productId?.title,
                image: item?.productId.image,
                price: item?.productId.salePrice >= 0 ? item?.productId.salePrice : item?.productId.price,
                quantity: item.quantity
            })
            ),
            addressInfo: {
                address: currentSelectedAddress?.address,
                addressId: currentSelectedAddress?._id,
                pincode: currentSelectedAddress?.pincode,
                city: currentSelectedAddress?.city,
                phone: currentSelectedAddress?.phone,
                notes: currentSelectedAddress?.notes
            },
            orderStatus: 'pending',
            paymentMethod: 'paypal',
            paymentStatus: 'pending',
            totalPrice: totalCartAmount,
            orderDate: new Date(),
            orderUpdateDate: new Date(),
            
        }
        console.log(orderData);
        dispatch(createNewOrder(orderData)).then((data)=>{
            console.log(data);
            if(data?.payload?.success){
                setIsPaymentStart(true);
            }else{
                setIsPaymentStart(false)
            }
            console.log(data.approvalURL);
        })
    }
    function handleCurrentAddress(curAddress) {
        setCurrentSelectedAddress(curAddress);
    }
    console.log(approvalURL,'approvalurl')
    if(approvalURL){
        window.location.href=approvalURL;
    }
    // console.log(currentSelectedAddress, "curaddress");
    return (

        <div className="flex-flex-col">
            <div className="w-full h-[300px] overflow-hidden">
                <img src={img} alt="account image " className='h-full w-full obejct-cover ' />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5' style={{ padding: "25px", marginTop: "20px" }}>

                <div className="col-span-2">
                    <Address selectedId={currentSelectedAddress} handleCurrentAddress={handleCurrentAddress} />
                </div>
                <div className='flex flex-col  '>
                    {cartItems && cartItems.length > 0 && cartItems.map((item) => <CartItemsContent cartItem={item} />)}
                    <div style={{ marginTop: "20px" }}>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-md">Total</span>
                            <span className="font-semibold text-md">$

                                {cartItems && cartItems.length > 0
                                    ? cartItems
                                        .reduce((total, item) => {
                                            const price =
                                                item?.productId?.salePrice > 0
                                                    ? item.productId.salePrice
                                                    : item.productId.price;
                                            return total + price * item.quantity;
                                        }, 0)
                                        .toFixed(2)
                                    : "0.00"}
                            </span>
                        </div>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                        {/* <Button variant='outlined'>Checkout with paypal</Button> */}
                        <Button className={'w-full'} variant='outlined' color='secondary' onClick={handleCkeckoutWithPaypal}>{isPaymentStart ? 'Processing Paypal payment...' : 'Checkout with paypal'}</Button>
                    </div>
                </div>
            </div>

        </div>
    );
}