import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import './home.scss'
import { RxCross2 } from "react-icons/rx";

function Home(){
    const [products , addproduct] = useState([]);
    const [name,setname] = useState("");
    const [price, setprice] = useState("");
    const [searchText,setsearchText] = useState("")
    const [error , seterror] = useState("")
    const [success,setsuccess] = useState("")
    const [searchedProducts, setsearchedProducts] = useState([])
    useEffect(()=>{
     setsearchedProducts([])
     const data = products.filter((data)=> data.name.toLowerCase().includes(searchText.toLowerCase()))
     setsearchedProducts(data);
    },[searchText])
    const addProduct=()=>{
        setsuccess(null)
        seterror(null)
        console.log(name)
        const check = products.filter((data)=>data.name.toLowerCase() === name.toLowerCase());
         console.log(check)
        if(check.length != 0){
            seterror("Product already exist")
        }
        else{
        const id = Math.floor(Math.random() * 90) + 10
        const data = {id:id+Date.now(), name:name,price:price}
        console.log(data)
        addproduct([...products, data])
        setsuccess("Product added successfully")
        }
    }
    const removeProduct=(id)=>{
       const newData = products.filter((data)=> data.id !== id)
       addproduct(newData)
    }
    const removeSearchedProduct=(id)=>{
        const newData = searchedProducts.filter((data)=> data.id !== id)
        setsearchedProducts(newData)
     }
    return(
        <>
        <div className="home-screen"> 
            <div className="input-wrapper">
            <FaSearch/>
            <input type="text" placeholder="Search For Products" 
            onChange={(e)=>{
              setsearchText(e.target.value)
            }}/>
            </div>
            {
                searchedProducts.length !== 0 && <ResultProduct products={searchedProducts} removeProduct={removeProduct} removeSearchedProduct={removeSearchedProduct}></ResultProduct>
            }
        </div>
        <div> 
        <div className="header"> Products</div>
        { products.length ?  <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                  products && products.map((data,i)=>
                  <tr key={data.id}>
                   <td>{data.name}</td>
                   <td>{data.price}</td>
                   <td> 
                    <div className="cancel-btn" onClick={()=>{
                    removeProduct(data.id)
                   }}><RxCross2></RxCross2>
                   </div>
                   </td>
                  </tr>
                  )  
                }
                 
            </tbody>
         </table> : <div className="no-products">No Products found</div> }
        
        </div>
        <div> 
         
              <div className="addproduct-form">
                <div className="header"><span>Add new Product</span></div>
                <form onSubmit={(e)=>{
                    e.preventDefault()
                    addProduct()
                }}>
                
                <input type="text" id="name"
                placeholder="Product Name"
                onChange={(e)=>{setname(e.target.value)}}
                required />
             
                <input type="number" id="price"
                placeholder="Product price"
                onChange={(e)=>{setprice(e.target.value)}}
                required 
                />
                <button type="submit">add</button>
                </form>
                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}
                </div>
        </div>
        </>
    )
}
const ResultProduct = ({products,removeProduct,removeSearchedProduct}) =>{
  return(
  <>
   
   <table>
           <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                  products && products.map((data)=>
                  <tr key={data.id}>
                   <td>{data.name}</td>
                   <td>{data.price}</td>
                   <td>
                    <div className="cancel-btn" onClick={()=>{
                    removeProduct(data.id)
                    removeSearchedProduct(data.id)
                   }}><RxCross2></RxCross2>
                   </div>
                   </td>
                  </tr>
                  )  
                }
                 
            </tbody>
         </table>
  </>
  )
}
export default Home;