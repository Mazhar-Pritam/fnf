
import Dashboard from "./pages/Dashboard.jsx";
import Categories from "./pages/Categories/Index.jsx"; 
import CategoryCreate from "./pages/Categories/Create.jsx"; 
import CategoryEdit from "./pages/Categories/Edit.jsx"; 
import { BrowserRouter, Routes, Route } from "react-router";
import Suppliers from "./pages/Suppliers.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        
        <Route path="categories">
          <Route index element={<Categories />} />
          <Route path="create" element={<CategoryCreate />} />
          <Route path="edit/:id" element={<CategoryEdit />} />
        </Route>

        <Route path="/suppliers" element={<Suppliers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;