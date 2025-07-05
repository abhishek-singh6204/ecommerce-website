import { addFeature, getFeature } from "@/store/common";
import { Button } from "@mui/material";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const {featureItems} =useSelector(state=>state.feature);
    const {user} =useSelector(state=>state.auth);
    function handleChange(e) {
        setFormData({ feature: e.target.files[0] })
    }

    function handleSubmit(e) {
        e.preventDefault();
        // const data = new FormData();
        // console.log(data);
        // data.append("feature", formData.feature);
        dispatch(addFeature(formData)).then(res => {
            console.log(res);
            if(res?.payload?.success){
                setFormData({});
                dispatch(getFeature());
            }
        });
    }
    // console.log(e);
    useEffect(()=>{
        dispatch(getFeature()).then((data)=>{
            console.log(data);
        })
    },[dispatch]);
    console.log(featureItems);
    return (

        <div style={{ padding: "15px" }} className="flex flex-col">
            <form onSubmit={handleSubmit}>
                <input type="file" name="feature" onChange={handleChange} />
                <Button variant="contained" disabled={Object.keys(formData).length === 0} type="submit">Upload</Button>
            </form>
            <div className="flex flex-col gap-5">
                {featureItems && featureItems.length>0 && featureItems.map((item)=><img src={item.image} alt="feature image" className="w-full h-[250px]"/>)}
            </div>
        </div>
    );
}