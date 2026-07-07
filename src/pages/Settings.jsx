import { useEffect, useState } from "react";
import api from "../services/api";

function Settings() {

const [value,setValue]=useState("");

useEffect(()=>{

load();

},[])

const load=async()=>{

const res=await api.get("/settings");

setValue(res.data.defaultLowStockThreshold);

}

const save=async()=>{

await api.put("/settings",{

defaultLowStockThreshold:value

})

alert("Saved Successfully");

}

return(

<div style={{padding:30}}>

<h1>Settings</h1>

<input

value={value}

onChange={(e)=>setValue(e.target.value)}

/>

<br/><br/>

<button onClick={save}>Save</button>

</div>

)

}

export default Settings;