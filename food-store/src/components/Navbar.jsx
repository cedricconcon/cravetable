import Button from "./Button";
import AuthModal from "./AuthModal"
import {useState} from "react"

export default function Navbar() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <nav className="bg-orange-500 p-4 flex justify-between items-center">
        <span className="text-white font-bold text-xl">CraveTable</span>
        <ul className="flex gap-6 list-none">
            <li><a href="/" className="text-white hover:text-orange-200">Home</a></li>
            <li><a href="/category" className="text-white hover:text-orange-200">Category</a></li>
        </ul>
        <div className="flex gap-2">
            <Button title="Sign In" onClick={() => setShowModal(true)}/>
            <Button title="Sign up" onClick={() => setShowModal(true)}/>
        </div>
      </nav>
       {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </>
  );
}
