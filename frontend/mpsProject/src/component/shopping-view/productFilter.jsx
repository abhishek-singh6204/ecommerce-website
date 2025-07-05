import { Fragment } from "react";
import './productFilter.css'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from "@mui/material/Checkbox";
const filterOption={
    category:[
        {id:"men",label:"Men"},
        {id:"women",label:"Women"},
        {id:"kids",label:"Kids"},
        {id:"accessories",label:"Accessories"},
        {id:"footware",label:"Footware"},
    ],
    brand:[
        {id:"nike",label:"Nike"},
        {id:"puma",label:"Puma"},
        {id:"adidas",label:"Adidas"},
        {id:"levi",label:"Levi"},
        {id:"zara",label:"Zara"},
        {id:"h&m",label:"H&M"},
    ],
}
function ProductFilter({handleFilter,filters,setFilters}){
    return (
        <div className="rounded-lg " style={{backgroundColor:"white"}}>
            <div className="border-b" style={{padding:"20px"}}>
                <h1 className="text-lg font-semibold" style={{margin:"0px"}}>Filters</h1>
            </div>
            <div style={{padding:"0px 20px 20px 20px"}}>
                {Object.keys(filterOption).map(keyItem=><Fragment>
                    <div >
                        <h3 className="text-base font-bold" style={{textTransform:"capitalize", margin:"20px 0px"}}>{keyItem}</h3>
                    </div>
                    <div className="grid gap-2 ">
                        {filterOption[keyItem].map((option)=>(
                             <FormControlLabel  control={<Checkbox checked={filters && Object.keys(filters).length>0 && filters[keyItem] && filters[keyItem].indexOf(option.id)>-1}/>} label={option.label} style={{margin:"0px", padding:"0px"}} onChange={()=>handleFilter(keyItem,option.id)}/>
                        ))}
                    </div>
                </Fragment>)}
            </div>
        </div>
    );
}
export default ProductFilter;