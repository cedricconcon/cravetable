import Navbar from "../components/Navbar"
import Button from "../components/Button"
import ProductCard from "../components/ProductCard"
import { useState, useEffect } from "react"
import { db } from "../firebase"
import { collection , getDocs} from "firebase/firestore"

function Home(){
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const querySnapshot = await getDocs(collection(db, "products"))
            const productList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setProducts(productList)
        }
        fetchProducts()
    }, [])


    return(
    <>
    <header>
        <Navbar />
    </header>
    <main>
        <section className="bg-orange-50 py-16 px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Order Food Delivered to You</h1>
            <p className="text-gray-500 mb-6">Fresh Food is enough to feel good </p>
            <Button title="Order Now"/>
        </section>
        <section className="px-8 py-8"> 
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Food</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.filter(product => product.category === "Food") .map(product => (
                    <ProductCard 
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    rating={product.rating}
                    numberSold={product.numberSold}
                    picture={product.picture}
                    description={product.description}/>
                ))}
            </div>
        </section>
        <section className="px-8 py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Drinks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.filter(product => product.category === "Drinks") .map(product => (
                    <ProductCard 
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    rating={product.rating}
                    numberSold={product.numberSold}
                    picture={product.picture}
                    description={product.description}/>
                ))}
            </div>
        </section>
        <section className="px-8 py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Snacks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.filter(product => product.category === "Snacks") .map(product => (
                    <ProductCard 
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    rating={product.rating}
                    numberSold={product.numberSold}
                    picture={product.picture}
                    description={product.description}/>
                ))}
            </div>
        </section>
        <section className="px-8 py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Dessert</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.filter(product => product.category === "Dessert") .map(product => (
                    <ProductCard 
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    rating={product.rating}
                    numberSold={product.numberSold}
                    picture={product.picture}
                    description={product.description}/>
                ))}
            </div>
        </section>
    </main>
    <footer className="bg-orange-500 text-white text-center p-4 mt-8">
        <p>© 2026 CraveTable. All rights reserved.</p>
    </footer>
    </>
)
}
export default Home