
import Dashboard from "./pages/Dashboard.jsx";
import Form from "./pages/Form.jsx";
import Inventory from "./pages/Inventory.jsx";
import Categories from "./pages/Categories/Index.jsx"; 
import CategoryCreate from "./pages/Categories/Create.jsx"; 
import CategoryEdit from "./pages/Categories/Edit.jsx"; 
import { BrowserRouter, Routes, Route } from "react-router";
import Suppliers from "./pages/Suppliers.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/form" element={<Form />} />
        <Route path="/inventory" element={<Inventory />} />
        
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