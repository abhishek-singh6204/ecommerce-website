import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ProductTile({ product, handleDetailed, handleAddToCart }) {
  return (
    <Card sx={{ maxWidth: 345, position: 'relative' }} className='w-full'>
      <div onClick={() => handleDetailed(product._id)}>
        <CardMedia
          sx={{ height: 180 }}
          image={product.image}
          title={product.title}

        />
      </div>
      <CardContent style={{ padding: "10px 16px 0px", margin: "0px" }}>
        <Typography variant="div" sx={{ color: 'text.secondary', display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <h3>Category: <span style={{ fontWeight: "bold" }}>{product.category}</span></h3>
          <h3>Brand: <span style={{ margin: "0px", fontWeight: "bold" }}>{product.brand}</span></h3>
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', display: "flex", justifyContent: "space-between" }}>
          <span style={{ textDecoration: "line-through", fontWeight: "bold" }}>${product.price}</span>
          <span style={{ margin: "0px", fontWeight: "bold", color: "black" }}>${product.salePrice}</span>
        </Typography>
      </CardContent>
      <CardActions style={{ padding: "0px 15px 15px" }}>
        {product?.totalStock === 0 ?
          <Button size="small" variant='contained' className='font-bold w-full' style={{ backgroundColor: "skyblue", cursor: product?.totalStock === 0 ? 'not-allowed' : 'pointer' }} >out of stock</Button>
          :
          <Button size="small" variant='contained' className='font-bold w-full' style={{ backgroundColor: "skyblue" }} onClick={() => handleAddToCart(product?._id,product?.totalStock)}>Add to cart</Button>


        }
        {/* <Button size="small" variant='contained' className='font-bold w-full' style={{ backgroundColor: "skyblue" }} onClick={()=>handleAddToCart(product?._id)}>Add to cart</Button> */}
      </CardActions>
      {product?.totalStock === 0 ?
        <p style={{ position: "absolute", top: "5px", right: "10px ", padding: "3px 5px", fontSize: "13px", backgroundColor: "#ff5722", color: "white", borderRadius: "20px" }}>out of stock</p>
        : product?.totalStock < 10 ? <p style={{ position: "absolute", top: "5px", right: "10px ", padding: "3px 5px", fontSize: "13px", backgroundColor: "#ff5722", color: "white", borderRadius: "20px" }}>{`${product?.totalStock} stock available`}</p>
          : <p style={{ position: "absolute", top: "5px", right: "10px ", padding: "3px 5px", fontSize: "13px", backgroundColor: "#ff5722", color: "white", borderRadius: "20px" }}>sale</p>


      }
      {/* {product.price - product.salePrice >= 50 && <p style={{ position: "absolute", top: "5px", right: "10px ", padding: "5px 10px", backgroundColor: "#ff5722", color: "white", borderRadius: "20px" }}>sale</p>} */}
    </Card>
  );
}