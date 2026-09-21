import {useState} from "react"
import { db } from "../firebase"
import {collection, addDoc} from "firebase/firestore"
export default function OrderModal({onClose, product}){
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        await addDoc(collection(db, "orders"), {
            name: name,
            phone: phone,
            address: address,
            productName: product.name,
            price: product.price,
            status: "Waiting",
            createdAt: new Date()
        })
        alert("Order placed successfully")
        onClose()
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <button type="button" onClick={onClose}>X</button>
            <label>Name: </label>
            <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}/>

            <label>Phone number: </label>
            <input 
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}/>

            <label>Address: </label>
            <input 
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}/>

            <button onClick={handleSubmit}>Save</button>
        </form>
        </>
    )
}