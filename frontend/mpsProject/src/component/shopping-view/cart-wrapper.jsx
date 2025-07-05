import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Padding } from "@mui/icons-material";
import './cart-wrapper.css'
import { Button } from "@/components/ui/button";
import CartItemsContent from "./cart-items-content";
import { useNavigate } from "react-router";
function CartWrapper({ cartItems,setOpenCartSheet }) {
    const navigate=useNavigate();
    function handleCheckout(){
        navigate("/shop/checkout");
        setOpenCartSheet(false);
    }
    // console.log(cartItems, "cartwrapper");
    return (
        <SheetContent className='sm:max-w-md sheetcontent' >
            <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
                <div style={{ marginTop: "20px" }}>
                    {cartItems && cartItems.length > 0 ? cartItems.map((item) => <CartItemsContent cartItem={item} />) : []}
                </div>
                <div style={{ marginTop: "20px" }}>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-md">Total</span>
                        <span className="font-semibold text-md">$ 
                            
                            {cartItems && cartItems.length > 0
                                ? cartItems
                                    .reduce((total, item) => {
                                        const price =
                                            item?.productId?.salePrice > 0
                                                ? item.productId?.salePrice
                                                : item.productId?.price;
                                        return total + price * item.quantity;
                                    }, 0)
                                    .toFixed(2)
                                : "0.00"}
                        </span>
                    </div>
                </div>
                <Button className='w-full bg-background cursor-pointer checkoutbtn' disabled={cartItems?.length === 0}  style={{ marginTop: "20px" }} onClick={()=>handleCheckout()}>Checkout</Button>
            </SheetHeader>
        </SheetContent>
    );
}
export default CartWrapper;