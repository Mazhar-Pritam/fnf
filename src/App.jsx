import { useState } from "react";
import Dashboard from "./pages/Dashboard.jsx";
import Categories from "./pages/Categories/Index.jsx"; 
import CategoryCreate from "./pages/Categories/Create.jsx"; 
import CategoryEdit from "./pages/Categories/Edit.jsx"; 
import { BrowserRouter, Routes, Route } from "react-router";
import Suppliers from "./pages/Suppliers/Index.jsx";
import SupplierCreate from "./pages/Suppliers/Create.jsx";
import SupplierEdit from "./pages/Suppliers/Edit.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Protected from './Auth/Protected.jsx';
import Logout from './Auth/Logout.jsx';
import Customers from "./pages/Customers/Index.jsx";
import CustomerCreate from "./pages/Customers/Create.jsx";
import CustomerEdit from "./pages/Customers/Edit.jsx";
import Purchases from "./pages/Purchases/Index.jsx";
import PurchaseCreate from "./pages/Purchases/Create.jsx";
import PurchaseEdit from "./pages/Purchases/Edit.jsx";
function App() {
   const [ isSignedIn, setIsSignedIn ] = useState(()=> {
    /* if you want, user will be logged in until they logout*/
    return localStorage.getItem("access_token") || false;
    /* if you want, user will be logged when they close the browser*/
    //return sessionStorage.getItem("access_token") || false;
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<Protected isSignedIn={isSignedIn} />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="logout" element={<Logout />} />

          <Route path="categories">
            <Route index element={<Categories />} />
            <Route path="create" element={<CategoryCreate />} />
            <Route path="edit/:id" element={<CategoryEdit />} />
          </Route>

          <Route path="suppliers">
            <Route index element={<Suppliers />} />
            <Route path="create" element={<SupplierCreate />} />
            <Route path="edit/:id" element={<SupplierEdit />} />
          </Route>

          <Route path="customers">
            <Route index element={<Customers />} />
            <Route path="create" element={<CustomerCreate />} />
            <Route path="edit/:id" element={<CustomerEdit />} />
          </Route>
        </Route>
                  <Route path="purchases">
            <Route index element={<Purchases />} />
            <Route path="create" element={<PurchaseCreate />} />
            <Route path="edit/:id" element={<PurchaseEdit />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;