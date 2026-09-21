import Button from "./Button";
import {useState, useEffect} from "react"
import {auth} from "../firebase"
import { onAuthStateChanged } from "firebase/auth";
import AuthModal from "./AuthModal";
import OrderModal from "./OrderModal";
const ProductCard = (props) => {
  const [user, setUser] = useState(null)
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
  }, [])

  const handleBuy = () => {
    if(user){
      setShowOrderModal(true)
    } else {
      setShowAuthModal(true)
    }
  }
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-64">
      <img src={props.picture || "https://placehold.co/300x200"} alt="Product" className="w-full h-48 object-cover"/>
     <div className="p-4">
      <h3 className="font-bold text-gray-800">{props.name}</h3>
      <p className="text-gray-500 text-sm mt-1">{props.description}</p>
      <p className="text-orange-500 font-semibold">{props.price}</p>
      <p className="text-gray-400 text-sm">{props.rating}</p>
      <p className="text-gray-400 text-sm">{props.numberSold}</p>
      <Button title="Buy" onClick={handleBuy}/>
      </div> 
      {showOrderModal && <OrderModal onClose={() => setShowOrderModal(false) }product={props}/>}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)}/>}
    </div>
  );
};

export default ProductCard;