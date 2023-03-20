import { useCallback,useEffect, useState } from "react"

const ProductList =()=>{
    const [products,setProducts]=useState([])

    const [loading,setLoading] = useState(false)

    const [error,setError]=useState("")

    const [url,setUrl] = useState("http://localhost:8000/products")



    const fetchProduct = useCallback(
        async () => {
            setLoading(true)
            try{
                const response =  await fetch(url)
                if(!response.ok){
                    throw new Error(response.statusText)
                    setLoading(false)
                    setError(response.statusText)
                }
                const data = await response.json()
                setLoading(false)
                setProducts(data)
            }
            catch(error){
                setLoading(false)
                setError(error.message)
            }
        },[url])
        
        useEffect(()=>{
       fetchProduct()
    }, [fetchProduct])


    function handle(id){
        setUrl(`http://localhost:8000/products?id=${id}`)
    }

    return(
            <div>
            <button onClick={()=>setUrl("http://localhost:8000/products?in_stock=true")}>Available Stock</button>
            <div className="w-4/5 mx-auto flex flex-wrap ">
            {loading && <p>Please Wait ......</p>}
            {error && <p>This Url  {error}</p> }
    
            {products.map((product,index)=>(
                <div className="ml-3 w-4/5 border-2 border-black border-solid m-1" key={product.id}>
                    <h1 className="p-3">{product.name}</h1>
                    <p className="p-3">Rs-{product.course_price}</p>
                    <p className="p-3">{product.in_stock? "in-stock":"out-of-stock"}</p>
                    <button className="ml-2 p-1 bg-blue-900 rounded-xl" onClick={()=>{handle(product.id)}}>BuyNow</button>
                    
                </div>
            ))}
            </div>
        </div>
    )
}

export default ProductList