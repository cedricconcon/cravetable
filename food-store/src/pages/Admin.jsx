import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const Admin = () => {
  const [newName, setSelectName] = useState("");
  const [newPrice, setSelectPrice] = useState("");
  const [newDescription, setSelectDesc] = useState("");
  const [newImg, setSelectImg] = useState("");
  const [newCategory, setSelectCategory] = useState("Food");
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    const querySnapshot = await getDocs(collection(db, "orders"))
    const orderList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    setOrders(orderList)
  }
  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const productList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(productList);
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);
const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      newName.trim() === "" ||
      newPrice.trim() === "" ||
      newDescription.trim() === ""
    )
      return;

    try {
      await addDoc(collection(db, "products"), {
        name: newName,
        price: newPrice,
        description: newDescription,
        category: newCategory,
        picture: newImg,
        createdAt: new Date(),
      });
      alert("data added successfully!");
      setSelectName("");
      setSelectPrice("");
      setSelectDesc("");
      fetchProducts();
    } catch (error) {
      console.error("error", error);
    }
  };
  const handleEdit = (product) => {
    setEditProduct(product);
  };

  const handleSaveEdit = async () => {
    await updateDoc(doc(db, "products", editProduct.id), {
      name: editProduct.name,
      price: editProduct.price,
    });
    setEditProduct(null);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleStatusUpdate = async (id, newStatus) => {
    await updateDoc(doc(db, "orders", id), {
      status: newStatus
    })
    fetchOrders()
  }

  return (
    <div>
      <Navbar />
      <section>
        <h2>Product Management</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setSelectName(e.target.value)}
            placeholder="Name"
          />
          <input
            type="number"
            value={newPrice}
            onChange={(e) => setSelectPrice(e.target.value)}
            placeholder="Price"
          />
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setSelectDesc(e.target.value)}
            placeholder="Description"
          />
          <input
            type="text"
            src=""
            value={newImg}
            onChange={(e) => setSelectImg(e.target.value)}
            placeholder="Image URL"
          />
          <select
            value={newCategory}
            onChange={(e) => setSelectCategory(e.target.value)}
          >
            <option>Food</option>
            <option>Drinks</option>
            <option>Snacks</option>
            <option>Dessert</option>
          </select>
          <Button title="Add Product" type="submit" />
        </form>
        {editProduct && (
          <div>
            <input
              value={editProduct.name}
              onChange={(e) =>
                setEditProduct({ ...editProduct, name: e.target.value })
              }
            />
            <input
              value={editProduct.price}
              onChange={(e) =>
                setEditProduct({ ...editProduct, price: e.target.value })
              }
            />
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={() => setEditProduct(null)}>Cancel</button>
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>
                  <button onClick={() => handleEdit(product)}>Edit</button>
                  <button onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
              <td>{order.name}</td>
              <td>{order.productName}</td>
              <td>{order.price}</td>
              <td>
                <select
                value={order.status}
                onChange={(e) => handleStatusUpdate(order.id, e.target.value)}>
                  <option>Waiting</option>
                  <option>Accepted</option>
                  <option>Delivery</option>
                  <option>Received</option>
                  <option>Cancelled</option>
                </select>
                </td>
            </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Admin;
