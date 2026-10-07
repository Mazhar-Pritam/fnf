import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import Body from "./pages/Body.jsx";
import Form from "./pages/Form.jsx";
import Footer from "./components/Footer.jsx";
import Inventory from "./pages/Inventory.jsx";
import Categories from "./pages/Categories/Index.jsx"; 
import CategoryCreate from "./pages/Categories/Create.jsx"; 
import Suppliers from "./pages/Suppliers/Index.jsx"; 
import SuppliersCreate from "./pages/Suppliers/Create.jsx"; 
import CategoryEdit from "./pages/Categories/Edit.jsx"; 
import { BrowserRouter, Routes, Route } from "react-router";
function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Sidebar />
        <div className="main-panel">
          <Header/>
           <Routes>
                    <Route path="/" element={<Body/>} />
                    <Route path="/form" element={<Form />} />
                    <Route path="/inventory" element={<Inventory />} />
                   
                    <Route path="categories">
                      <Route index element={<Categories />} />
                      <Route path="create" element={<CategoryCreate />} />
                      <Route path="edit/:id" element={<CategoryEdit />} />
                    </Route>
                    <Route path="suppliers">
                      <Route index element={<Suppliers />} />
                      <Route path="create" element={<SuppliersCreate />} />
                    </Route>
                </Routes>
                <Footer />
                {/* <inventory /> */}

      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;