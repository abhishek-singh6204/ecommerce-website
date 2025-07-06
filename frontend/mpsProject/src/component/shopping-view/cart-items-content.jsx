import { Button } from '@/components/ui/button';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItem, editCartItem } from '@/store/cartSlice';
import toast, { ToastBar } from 'react-hot-toast';
import { fetchFilteredProducts } from '@/store/shopProductSlice';
import { useEffect } from 'react';

function CartItemsContent({ cartItem }) {
    // console.log(cartItem,"cart content");
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { shopProductList } = useSelector(state => state.shopProducts);

    // console.log(cartItem,"cart");
    function handleCartItemDelete(product) {
        // console.log(product?._id);
        dispatch(deleteCartItem({ userId: user?.id, productId: product?.productId?._id }));
        toast.success("Removed from cart");
    }
    function hanndleEditCart(cart, actiontype) {
        console.log(cart, actiontype)
        if (actiontype === 'plus') {
            const getItems = shopProductList;
            console.log(cart);
            if (getItems.length) {
                const productIndex = getItems.findIndex(indx => indx._id === cart?.productId?._id);
                console.log(productIndex, 'indx')
                if (productIndex > -1) {
                    const stock = getItems[productIndex].totalStock;
                    console.log(stock);
                    const getQuantity = getItems[productIndex].quantity;
                    console.log(getQuantity);
                    if (cart.quantity + 1 > stock) {
                        toast.error(`you can add ${stock} items`);
                        return;
                    }

                }
            }
        }

        dispatch(editCartItem({
            userId: user?.id, productId: cart?.productId?._id, quantity: actiontype === "plus" ? cart.quantity + 1 : cart.quantity - 1
        }))
    }
    useEffect(() => {
            dispatch(fetchFilteredProducts({
                filterparams: {}, sortparams: {}
            }))
    }, [dispatch])
    // console.log(shopProductList);
    return (

        <div className="flex items-center gap-2 " style={{ padding: "10px 0px" }}>

            <img src={cartItem?.productId?.image} alt={cartItem?.productId?.title} className="h-20 w-20 object-cover rounded" />
            <div className="flex-1" >
                <h1 className="font-bold" style={{ marginBottom: "7px" }}>{cartItem?.productId?.title}</h1>
                <div className='flex items-center gap-2'>
                    <IconButton aria-label="delete" size="small" disabled={cartItem?.quantity <= 1} onClick={() => hanndleEditCart(cartItem, "minus")}><RemoveIcon /></IconButton>
                    <span style={{ marginBottom: "0px" }} className='text-md font-bold'>{cartItem?.quantity}</span>
                    <IconButton aria-label="delete" size="small" onClick={() => hanndleEditCart(cartItem, "plus")}><AddIcon /></IconButton>
                </div>
            </div>
            <div className='flex items-end flex-col'>
                <p style={{ padding: "5px" }}>${((cartItem?.productId?.salePrice > 0 ? cartItem?.productId?.salePrice : cartItem?.productId?.price)) * (cartItem?.quantity)?.toFixed(2)}</p>
                <IconButton aria-label="delete" size="small" onClick={() => handleCartItemDelete(cartItem)}><DeleteIcon /></IconButton>
            </div>
        </div>
    );
}
export default CartItemsContent;
