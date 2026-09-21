import Navbar from "../components/Navbar";
import {useState, useEffect} from "react"
import {db} from "../firebase"
import {collection, getDocs} from "firebase/firestore"
import ProductCard from "../components/ProductCard";

const Category = () => {
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("Food")

  const fetchProducts = async () => {
            const querySnapshot = await getDocs(collection(db, "products"))
            const productList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setProducts(productList)
        }
        useEffect(() => {
          fetchProducts()
        }, [])
  return (
    <div className="p-8">
      <Navbar />
      <div className="flex gap-4 mb-8">
        <button className="bg-orange-500 text-white px-4 py-2 rounded-full" onClick={() => setSelectedCategory("Food")}>Food</button>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-full" onClick={() => setSelectedCategory("Drinks")}>Drinks</button>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-full" onClick={() => setSelectedCategory("Snacks")}>Snacks</button>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-full" onClick={() => setSelectedCategory("Dessert")}>Dessert</button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {products.filter(product => product.category === selectedCategory).map(product => (
          <ProductCard 
            key={product.id}
            name={product.name}
            price={product.price}
            rating={product.rating}
            numberSold={product.numberSold}/>
        ))}
      </div>
    </div>
  );
};

export default Category;