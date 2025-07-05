import Button from '@mui/material/Button';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import StarIcon from '@mui/icons-material/Star';
import Avatar from '@mui/material/Avatar';
import StarRating from '../common/starRating';
export default function ReviewComment({ reviewData }) {
    console.log(reviewData);
    return (
        <div className='flex gap-4 border-b' style={{ paddingBottom: "10px" }}>
            <Avatar
                sx={{ bgcolor: "gray" }}
                alt="Remy Sharp"
                src="/broken-image.jpg"
                className='cursor-pointer'
            >
                {reviewData?.userName[0].toUpperCase()}
            </Avatar>
            <div className='flex flex-col gap-0.7'>
                <h3 className='font-bold text-md'>{reviewData?.userName}</h3>
                <div className='flex items-center' style={{ fontSize: "18px" }}>
                    <StarRating rating={reviewData?.reviewValue} />
                </div>
                <p className='text-muted-foreground'>{reviewData?.reviewMessage}</p>
            </div>
        </div>
    );
}