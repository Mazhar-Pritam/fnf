import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import Body from "./pages/Body.jsx";
import Form from "./pages/Form.jsx";
import Footer from "./components/Footer.jsx";
import Inventory from "./pages/Inventory.jsx";
import Categories from "./pages/Categories/Index.jsx"; 
import CategoryCreate from "./pages/Categories/Create.jsx"; 
import CategoryEdit from "./pages/Categories/Edit.jsx"; 
import { BrowserRouter, Routes, Route } from "react-router";
import Suppliers from "./pages/Suppliers.jsx";
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

                    <Route path="/suppliers" element={<Suppliers />} />
                </Routes>
                <Footer />
                {/* <inventory /> */}

      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;