import { Button } from "@mui/material";
import { Fragment, useState, useEffect } from "react";
import './products.css'
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import * as React from 'react';
// import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import { fetchAllProducts } from "../../store/adminProductSlice";
import ProductTile from "../../component/product-tile";
import { useLocation, useNavigate } from "react-router";
import { useOutletContext } from "react-router-dom";
import { editProduct } from '../../store/adminProductSlice'
import { Sheet, SheetContent } from "@/components/ui/sheet";
export default function Products() {
    const { setHeight } = useOutletContext();
    // console.log(setHeight);
    const { isloading, productList } = useSelector(state => state.adminProducts);
    const dispatch = useDispatch();
    const [openForm, setOpenForm] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [id, setId] = useState(null);
    const location = useLocation();
    // useEffect(() => {
    //     // Reload the page when the route changes
    //     window.location.reload();
    // }, [location.pathname]);


    let [formData, setFormData] = useState({
        title: "",
        description: "",
        salePrice: "",
        price: "",
        image: null,
        category: "men", // Default value
        totalStock: "",
        brand: "nike"
    });

    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData);
    };
    const handleFileChange = (e) => {
        // console.log(e.target.files);
        setFormData({ ...formData, image: e.target.files[0] });
    };
    const handleCancel = (e) => {
        setOpenForm(!openForm),
            setIsEditing(false),
            setFormData({
                title: "",
                description: "",
                salePrice: "",
                price: "",
                image: null,
                category: "men", // Default value
                totalStock: "",
                brand: "nike"
            })
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        const data = new FormData();

        Object.entries(formData).forEach(([key, value]) => data.append(key, value));
        if (formData.title === "" || formData.description === "" || formData.image === null || formData.price <= 0) {
            toast.error("filll the product detail properly!");
        }
        else {
            try {
                setIsSaving(true);
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/addProduct`, data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                if (response.status === 200) {
                    setFormData({
                        title: "",
                        description: "",
                        salePrice: "",
                        price: "",
                        image: null,
                        category: "men",
                        totalStock: "",
                        brand: "nike"
                    });
                    setOpenForm(false)
                    setIsSaving(false);
                    toast.success("Product added successfully!");
                    dispatch(fetchAllProducts());
                    navigate("/admin/products");
                } else {
                    setFormData({
                        title: "",
                        description: "",
                        salePrice: "",
                        price: "",
                        image: null,
                        category: "men",
                        totalStock: "",
                        brand: "nike"
                    });
                    setOpenForm(false)
                    toast.error("Product not saved!");
                    setIsSaving(false);
                    navigate("/admin/products");
                }
            } catch (error) {
                setFormData({
                    title: "",
                    description: "",
                    salePrice: "",
                    price: "",
                    image: null,
                    category: "men",
                    totalStock: "",
                    brand: "nike"
                });
                setOpenForm(false)
                setIsSaving(false);
                console.error("Upload failed", error);
            }
        };

    }

    const handleEdit = async (e) => {
        e.preventDefault();
        dispatch(editProduct({ id, formData })).then((data) => {
            if (data?.payload?.success) {
                toast.success("Product edited sucessfully!");
                setFormData({
                    title: "",
                    description: "",
                    salePrice: "",
                    price: "",
                    image: null,
                    category: "men", // Default value
                    totalStock: "",
                    brand: "nike"
                })
                setHeight(false);
                setIsEditing(false);
                setOpenForm(false);
                setId(null);
                dispatch(fetchAllProducts())
                navigate("/admin/products");
            }
            else {
                toast.error("not edited!");
                setId(null);
                setFormData({
                    title: "",
                    description: "",
                    salePrice: "",
                    price: "",
                    image: null,
                    category: "men", // Default value
                    totalStock: "",
                    brand: "nike"
                })
                setHeight(false);
                setIsEditing(false);
                setOpenForm(false);
            }
        })
    }
    useEffect(() => {
        dispatch(fetchAllProducts())
    }, [dispatch]);
    console.log("productList", productList);
    return (
        <Fragment>
            <>


                {/* {openForm && */}
                <Sheet open={openForm} onOpenChange={handleCancel}>
                    <div className="flex flex-1 justify-end " style={{ marginBottom: "20px" }}>
                        <Button variant="contained" onClick={() => { setOpenForm(!openForm) }} style={{margin:"20px 20px 0px 20px"}}>Add new product</Button>
                    </div>
                    <SheetContent>
                    <div className="row formopen " style={{minHeight:"100vh "}}>
                        <div className="formBox col-6  shadow-md " style={{ padding: "15px 25px",minHeight:"100vh " }}>
                            <form onSubmit={handleSubmit} className="product-form">
                               
                                {isEditing ? <p className="font-bold text-center" style={{ fontSize: "20px", marginBottom: "10px" }}>Edit Product</p>
                                    : <p className="font-bold text-center" style={{ fontSize: "20px", marginBottom: "10px" }}>Add new products</p>
                                }
                                <div>
                                    <label htmlFor="title">
                                        Title:</label>
                                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} placeholder="Enter product title" required />

                                </div>
                                <div>
                                    <label htmlFor="description">
                                        Description:</label>
                                    <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Enter description" required />

                                </div>
                                <div>
                                    <label htmlFor="price">
                                        Price: </label>
                                    <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} placeholder="Enter product price" required />

                                </div>

                                <div>
                                    <label htmlFor="number">
                                        Sale Price: </label>
                                    <input type="number" id="number" name="salePrice" value={formData.salePrice} onChange={handleChange} placeholder="Enter product saleprice" required />

                                </div>

                                {!isEditing &&

                                    <div>
                                        <label htmlFor="image">
                                            Image URL: </label>
                                        <input type="file" name="image" id="image" onChange={handleFileChange} required />
                                    </div>
                                }


                                <div style={{ marginBottom: "15px" }}>
                                    <label htmlFor="category" >
                                        Category: </label>
                                    <select name="category" id="category" value={formData.category} onChange={handleChange} style={{
                                        padding: "4px 10px", width: "100%", marginBottom: "0px", padding: "6px 10px",
                                        width: "100%", outline: "none", borderRadius: "5px", boxShadow: "0px 0px 0px 0.2px gray", marginTop: "10px"
                                    }} >
                                        <option value="men">Men</option>
                                        <option value="women">Women</option>
                                        <option value="kids">Kids</option>
                                        <option value="accessories">Accessories</option>
                                        <option value="footware">Footware</option>
                                    </select>

                                </div>
                                <div style={{ marginBottom: "15px" }}>
                                    <label htmlFor="brand" >
                                        Brand: </label>
                                    <select name="brand" id="brand" value={formData.brand} onChange={handleChange} style={{
                                        padding: "4px 10px", width: "100%", marginBottom: "0px", padding: "6px 10px",
                                        width: "100%", outline: "none", borderRadius: "5px", boxShadow: "0px 0px 0px 0.2px gray", marginTop: "10px"
                                    }} >
                                        <option value="nike">Nike</option>
                                        <option value="puma">Puma</option>
                                        <option value="zara">Jara</option>
                                        <option value="levis">Levis</option>
                                        <option value="h&m">H&M</option>
                                    </select>

                                </div>

                                <div>
                                    <label htmlFor="totalStock">
                                        Total Stock: </label>
                                    <input type="number" name="totalStock" id="totalStock" value={formData.totalStock} onChange={handleChange} placeholder="Enter product stock" required />


                                </div>
                                {isEditing ?
                                    <div >
                                        <Button variant="contained" className="w-full" onClick={handleEdit}> Edit</Button>
                                    </div>
                                    : <div className="">
                                        <Button variant="contained" className="w-full" onClick={handleSubmit}> Submit</Button>
                                    </div>}


                                {isSaving && <Button loading variant="contained" loadingPosition="end" className="flex items-center">
                                    Submit
                                </Button>}


                            </form>
                        </div>
                    </div>
                    </SheetContent>
                </Sheet>
                {/* } */}

                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-center" style={{padding:"20px"}}>
                    {productList && productList.length > 0 && productList.map((product) =>
                    
                        <ProductTile className={'w-100 '}  product={product} setFormData={setFormData} setOpenForm={setOpenForm} setIsEditing={setIsEditing} setId={setId} setHeight={setHeight} id={id} />
                    )}
                </div>
            </>
        </Fragment >
    );
}









// import React, { useState } from "react";

// const ProductForm = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     salePrice: "",
//     price: "",
//     image: "",
//     category: "men", // Default value
//     totalStock: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Data Submitted:", formData);
//     // Handle form submission logic here (e.g., API call)
//   };

//   return (
//     <form onSubmit={handleSubmit} className="product-form">
//       <label>
//         Title:
//         <input type="text" name="title" value={formData.title} onChange={handleChange} required />
//       </label>

//       <label>
//         Description:
//         <textarea name="description" value={formData.description} onChange={handleChange} required />
//       </label>

//       <label>
//         Sale Price:
//         <input type="number" name="salePrice" value={formData.salePrice} onChange={handleChange} required />
//       </label>

//       <label>
//         Price:
//         <input type="number" name="price" value={formData.price} onChange={handleChange} required />
//       </label>

//       <label>
//         Image URL:
//         <input type="text" name="image" value={formData.image} onChange={handleChange} required />
//       </label>

//       <label>
//         Category:
//         <select name="category" value={formData.category} onChange={handleChange}>
//           <option value="men">Men</option>
//           <option value="women">Women</option>
//           <option value="kids">Kids</option>
//           <option value="accessories">Accessories</option>
//         </select>
//       </label>

//       <label>
//         Total Stock:
//         <input type="number" name="totalStock" value={formData.totalStock} onChange={handleChange} required />
//       </label>

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

