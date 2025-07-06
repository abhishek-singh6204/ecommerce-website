import { useEffect, useState } from "react";
import ProductFilter from "../../component/shopping-view/productFilter";
import ProductTile from "../../component/shopping-view/productTile";
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilteredProducts, getProductDetailes } from "../../store/shopProductSlice/index";
import { useSearchParams } from 'react-router-dom';
import ProductDetails from "@/component/shopping-view/productDetail";
import { addToCart, getCartItems } from "@/store/cartSlice";
import toast from "react-hot-toast";

function createSearchparamshelper(filters) {
    const query = [];
    for (const [key, value] of Object.entries(filters)) {
        if (Array.isArray(value) && value.length > 0) {
            const paramsValue = value.join(",");
            query.push(`${key}=${encodeURIComponent(paramsValue)}`)
        }
    }
    // setQueryParams(query);
    return query.join("&");
}

export default function ShoppingListing() {
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState(null);
    const [queryParams, setQueryParams] = useSearchParams()
    const dispatch = useDispatch();
    const { shopProductList, productDetails } = useSelector(state => state.shopProducts);
    const { user } = useSelector(state => state.auth);
    const [openDetailsDialog, setOpenDetailedDialog] = useState(false);
    const { cartItems } = useSelector(state => state.cartProducts);
    const categorySearchParams = queryParams.get('category');
    function handleDetailed(id) {
        dispatch(getProductDetailes(id));
    }
    function handleOnchange(e) {
        // console.log(e.target.value);
        setSort(e.target.value);
    }
    function handleFilter(section_id, current_Option) {
        // /console.log(section_id,current_Option);
        let cpyFilters = { ...filters };
        let indexOfCurrentSection = Object.keys(cpyFilters).indexOf(section_id);
        if (indexOfCurrentSection === -1) {
            cpyFilters = {
                ...cpyFilters,
                [section_id]: [current_Option]
            }
        }
        else {
            const indexOfCurrentOption = cpyFilters[section_id].indexOf(current_Option);
            if (indexOfCurrentOption === -1) {
                cpyFilters[section_id].push(current_Option);
            } else {
                cpyFilters[section_id].splice(indexOfCurrentOption, 1);
            }
        }
        setFilters(cpyFilters);
        sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
    }
    function handleAddToCart(productId, stock) {
        const getItems = cartItems;
        console.log(getItems);
        // console.log(getCartItems);
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
        // console.log(productId);
        // console.log(user.id,user.username);
        dispatch(addToCart({ userId: user.id, productId: productId, quantity: 1 })).then((data) => {
            if (data?.payload?.success) {
                dispatch(getCartItems(user?.id)).then((data) => {
                    console.log(data);
                })
            }
        })
    }
    useEffect(() => {
        if (filters && Object.keys(filters).length > 0) {
            const queryString = createSearchparamshelper(filters);
            setQueryParams(new URLSearchParams(queryString));
        }
    }, [filters])
    useEffect(() => {
        if (productDetails !== null) setOpenDetailedDialog(true);
    }, [productDetails])
    useEffect(() => {
        setSort("priceHightolow");
        setFilters(JSON.parse(sessionStorage.getItem("filters")) || {})
    }, [categorySearchParams])
    // useEffect(()=>{
    //     dispatch(getCartItems(user?.id))
    // },[dispatch])
    useEffect(() => {
        if (filters != null && sort != null)
            dispatch(fetchFilteredProducts({ filterparams: filters, sortparams: sort }))
    }, [dispatch, sort, filters])
    

    console.log(cartItems,'product');
    return (
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap=5" style={{ padding: "20px" }}>
            <ProductFilter filters={filters} handleFilter={handleFilter} setFilters={setFilters} />
            <div className=" rounded-lg " style={{ padding: "20px 0px" }}>
                <div className="flex justify-between items-center border-b" style={{ padding: "10px 0px" }}>
                    <h1 className="text-lg font-bold" style={{ margin: "0px" }}>All Products</h1>
                    <div className="flex gap-4 items-center">
                        <span className="text-muted-foreground " style={{ margin: "0px" }}>10 Products</span>
                        <select name="sortby" id="sortby" style={{ outline: "none" }} onChange={handleOnchange} value={sort}>
                            <option value="" disabled selected>SortBy</option>
                            <option value="priceHightolow" >priceHightolow</option>
                            <option value="priceLowtoHigh">priceLowtoHigh</option>
                            <option value="sortAtoZ">sort : AtoZ</option>
                            <option value="sortZtoA">sort : ZtoA</option>
                        </select>

                    </div>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" style={{ padding: "20px 0px" }}>
                    
                        {shopProductList && shopProductList.length > 0 && shopProductList.map((product) =>
                        <div className="flex justify-center">
                             <ProductTile product={product} handleDetailed={handleDetailed} handleAddToCart={handleAddToCart} className={'w-full'}/>
                        </div>)}
                    
                </div>
            </div>

            <ProductDetails openProduct={openDetailsDialog} setOpenProduct={setOpenDetailedDialog} productDetails={productDetails} handleAddToCart={handleAddToCart} />
        </div>
    );
}