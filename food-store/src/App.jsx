import Home from "./pages/Home"
import Admin from "./pages/Admin"
import Category from "./pages/Category"
import {BrowserRouter, Routes, Route} from "react-router-dom"

function App(){
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/category" element={<Category />}/>
      <Route path="/admin" element={<Admin />}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App