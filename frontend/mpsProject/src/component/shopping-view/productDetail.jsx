import Button from '@mui/material/Button';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import StarIcon from '@mui/icons-material/Star';
import Avatar from '@mui/material/Avatar';
import ReviewComment from './review';
import { useDispatch, useSelector } from 'react-redux';
import { setProductDetails } from '@/store/shopProductSlice';
import { Label } from '@radix-ui/react-label';
import StarRating from '../common/starRating';
import { useEffect, useState } from 'react';
import { addReview, getReview } from '@/store/reviewSlice';
export default function ProductDetails({ openProduct, setOpenProduct, productDetails, handleAddToCart }) {
    const dispatch = useDispatch();
    const [reviewMsg,setReviewMsg]=useState('');
    const [rating,setRating]=useState(0);
    // const {user}=useSelector(state=>state.auth);
    const {user} =useSelector(state=>state.auth);
    const {reviewList} =useSelector(state=>state.review);

    function handleDialogClose() {
        setOpenProduct(false);
        dispatch(setProductDetails());
    }
    function handleSetReview(e){
        setReviewMsg(e.target.value)
    }
    function getRating(rating){
        setRating(rating);
    }
    function handleSubmitReview(){
        // console.log(reviewMsg,rating);
        dispatch(addReview({
            productId:productDetails?._id,userId:user?.id,userName:user?.username,reviewMessage:reviewMsg,reviewValue:rating
        })).then((data)=>{
            console.log(data);
            if(data?.payload?.success){
                setRating(0);
                setReviewMsg('');
                dispatch(getReview(productDetails?._id))
            }
        })
    }
    useEffect(()=>{
        if(productDetails!=null ) dispatch(getReview(productDetails._id))
    },[productDetails])

    const reviewLength=reviewList.length;
    const avgReviewRating=reviewLength && reviewLength>0 ? reviewList.reduce((sum,reviewItem)=>sum+reviewItem.reviewValue,0)/reviewLength : 0;
    return (
        <Dialog open={openProduct} onOpenChange={handleDialogClose}>
            <DialogContent className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[55vw] " style={{ padding: "20px" }}>
                <div className="relative overflow-hidden rounded-lg detailsImg">
                    <img src={productDetails?.image} alt={productDetails?.title} height={400} width={400} className="aspect-square w-full object-cover" />
                </div>
                <div>
                    <h1 className="text-xl font-extrabold">{productDetails?.title}</h1>
                    <p className="text-muted-foreground">{productDetails?.description}</p>
                    <div className="flex items-center justify-between" style={{ margin: "10px 0px" }}>
                        <p className="text-lg font-semibold " style={{ textDecoration: "line-through" }}> ${productDetails?.price}</p>
                        <p className="text-lg text-muted-foreground ">${productDetails?.salePrice}</p>
                    </div>
                    <div className='flex items-center gap-3' style={{ marginBottom: "15px", fontSize: "25px" }} >
                        <div className='flex items-center '>
                            
                            <StarRating rating={avgReviewRating}/>
                        </div>
                        <span style={{ margin: "0px", fontSize: "16px" }} className='text-muted-foreground'>({avgReviewRating.toFixed(1)})</span>
                    </div>
                    {productDetails?.totalStock === 0 ? <Button variant='contained' style={{ backgroundColor: "black", color: "white", cursor: productDetails?.totalStock === 0 ? 'not-allowed' : 'pointer', opacity:productDetails?.totalStock === 0 ? '0.5' : '1' }} className='w-full' >Out of stock</Button>
                        : <Button variant='contained' style={{ backgroundColor: "black", color: "white" }} className='w-full' onClick={() => { handleAddToCart(productDetails?._id,productDetails?.totalStock), setOpenProduct(false) }}>Add to Cart</Button>

                    }
                    {/* <Button variant='contained' style={{ backgroundColor: "black", color: "white" }} className='w-full' onClick={() => { handleAddToCart(productDetails?._id), setOpenProduct(false) }}>Add to Cart</Button> */}

                    <div className='grid review-section  overflow-y-scroll' style={{ maxHeight: "150px", overflowY: "scroll", padding: "10px 0px" }}>
                        <h1 className='font-bold text-lg'>Reviews</h1>
                        <div className='grid gap-3'>
                            
                            {reviewList && reviewList.length>0 && reviewList.map((singleReview)=><ReviewComment reviewData={singleReview}/>)}
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Label style={{marginBottom:"0px"}}>Write a review</Label>
                        <div className="flex">
                            <StarRating  getRating={getRating} rating={rating}/>
                        </div>
                        
                        <input type="text" name="reviewMsg" id="" placeholder='Enter reviews...'  onChange={handleSetReview} style={{ margin: "0px" }} />
                        <Button variant='outlined' type='submit' disabled={rating==0 || reviewMsg===''} onClick={handleSubmitReview}>Submit</Button>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    );
}