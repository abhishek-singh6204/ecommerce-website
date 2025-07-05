import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import {deleteProduct,fetchAllProducts} from '../../store/adminProductSlice'
import toast from 'react-hot-toast';
export default function ProductTile({product,setFormData,setOpenForm,setIsEditing,setId,setHeight,id}) {
  const dispatch=useDispatch();
  const { productList } = useSelector(state => state.adminProducts);
  function handleEditClick(){
    setFormData(product),
    setOpenForm(true),
    setIsEditing(true),
    setId(product._id);
    // console.log(product._id);
    setHeight(true);
  }
  function handleDelete(id){
    dispatch(deleteProduct({id})).then((data)=>{
       if(data?.payload?.success){
                toast.success("Product deleted sucessfully!");
                dispatch(fetchAllProducts());
                navigate("/admin/orders");
            }
            else{
                toast.error("not deleted!");
            }
    })
  }
  return (
    <Card sx={{ maxWidth:'100%', alignSelf:"center" }} >
      <CardMedia
        sx={{ height: 180 }}
        image={product.image}
        title={product.title}
      />
      <CardContent style={{padding:"10px 16px 0px", margin:"0px"}}>
        <Typography gutterBottom variant="p" component="div" style={{marginBottom:"0px",fontSize:"18px", fontWeight:"600", textTransform:"capitalize"}}>
            {product.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', display:"flex", justifyContent:"space-between" }}>
          <span style={{textDecoration:"line-through", fontWeight:"bold"}}>{product.price-product.salePrice===0 ? "" : `$${product.price}`}</span>
          <span style={{margin:"0px", fontWeight:"bold", color:"black"}}>${product.salePrice}</span>
        </Typography>
      </CardContent>
      <CardActions style={{padding:"0px 8px 8px" }}>
        <Button size="small" variant='contained' className='font-bold' onClick={handleEditClick }>edit</Button>
        <Button size="small" variant='contained' style={{backgroundColor:"red"}} onClick={()=>handleDelete(product._id)}>delete</Button>
      </CardActions>
    </Card>
  );
}