import { Button } from "@/components/ui/button";
import StarIcon from '@mui/icons-material/Star';

export default function StarRating({rating,getRating}){
    // console.log(rating);
    return [1,2,3,4,5].map((star)=>(
        <Button variant={`outlined`} style={{padding:"0px"}} className={`rounded-full transition-colors ${star<=rating ? 'text-yellow-500 hover:bg-black' : 'text-black hover:bg-gray-300 hover:text-gray'} `} size={'icon'} onClick={()=>getRating(star)}>
            <StarIcon className={`${star<=rating ? 'text-yellow-500 hover:bg-black' : 'text-black hover:bg-primary hover:text-gray-400'} `}/>
        </Button>
    ))
}