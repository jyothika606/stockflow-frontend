import { useEffect, useState } from "react";
import api from "../services/api";

function Products() {

  const [products,setProducts]=useState([]);

  useEffect(()=>{
      loadProducts();
  },[])

  const loadProducts=async()=>{

      const res=await api.get("/products");

      setProducts(res.data);

  }

  const deleteProduct=async(id)=>{

      await api.delete(`/products/${id}`);

      loadProducts();

  }

  return(

      <div style={{padding:30}}>

      <h1>Products</h1>

      <table border="1" cellPadding="10">

      <thead>

      <tr>

      <th>Name</th>

      <th>Qty</th>

      <th>Price</th>

      <th>Action</th>

      </tr>

      </thead>

      <tbody>

      {products.map((p)=>(

      <tr key={p.id}>

      <td>{p.name}</td>

      <td>{p.quantity}</td>

      <td>{p.sellingPrice}</td>

      <td>

      <button onClick={()=>deleteProduct(p.id)}>Delete</button>

      </td>

      </tr>

      ))}

      </tbody>

      </table>

      </div>

  )

}

export default Products;