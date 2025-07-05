import ProductTile from "@/component/shopping-view/productTile";
import { Input } from "@/components/ui/input";
import { getCartItems } from "@/store/cartSlice";
import { resetSearchProducts, searchProducts } from "@/store/searchSlice";
import { Heading2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import { addToCart } from "@/store/cartSlice";
import toast from "react-hot-toast";
import { getProductDetailes } from "@/store/shopProductSlice";
import ProductDetails from "@/component/shopping-view/productDetail";

function SearchProducts() {
    const [keyword, setKeyword] = useState('');
    const [searchParams, setSearchParams] = useSearchParams()
    const [openDetailsDialog, setOpenDetailedDialog] = useState(false);

    const dispatch = useDispatch();
    const { searchProduct } = useSelector(state => state.search);
    const { cartItems } = useSelector(state => state.cartProducts || []);
    const { shopProductList, productDetails } = useSelector(state => state.shopProducts);

    const { user } = useSelector(state => state.auth);
    function handleAddToCart(productId, stock) {
        const getItems = cartItems;
        console.log(getItems);
        if (getItems.length) {
            const productIndex = getItems.findIndex(indx => indx.productId._id === productId);
            if (productIndex > -1) {
                const getQuantity = getItems[productIndex].quantity;
                if (getQuantity + 1 > stock) {
                    toast.error(`you can add ${stock} items`);
                    return;
                }

            }
        }
        console.log(productId);
        console.log(user.id, user.username);
        dispatch(addToCart({ userId: user.id, productId: productId, quantity: 1 })).then((data) => {
            if (data?.payload?.success) {
                dispatch(getCartItems(user?.id)).then((data) => {
                    console.log(data);
                })
            }
        })
    }
    function handleDetailed(id) {
        dispatch(getProductDetailes(id));
    }
    // console.log(keyword,'keyword');
    useEffect(() => {
        if (keyword && keyword.trim() !== '' && keyword.trim().length > 2) {
            setTimeout(() => {
                setSearchParams(`?keyword=${keyword}`);
                dispatch(searchProducts(keyword));
            }, 1000)
        } else {
            setSearchParams(``);
            dispatch(resetSearchProducts());
        }
    }, [keyword])
    useEffect(() => {
        if (productDetails !== null) setOpenDetailedDialog(true);
    }, [productDetails])
    console.log(searchProduct);
    return (
        <div style={{ padding: "20px" }} className="abcde">
            <div className="flex items-center w-full" style={{marginTop:"30px"}}>
                <Input
                    placeholder="Search Products...."
                    style={{ padding: "20px" }}
                    name='keyword'
                    onChange={(event) => setKeyword(event.target.value)}
                />
            </div>
            <div style={{ marginTop: "30px" }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                    {searchProduct && searchProduct.length > 0 ? searchProduct.map(item => 
                    <div className="flex justify-center">
                    <ProductTile product={item} handleAddToCart={handleAddToCart} handleDetailed={handleDetailed} />
                    </div>) : <h2>No product found!</h2>}
                </div>
            </div>
            <ProductDetails openProduct={openDetailsDialog} setOpenProduct={setOpenDetailedDialog} productDetails={productDetails} handleAddToCart={handleAddToCart} />

        </div>
    );
}
export default SearchProducts;