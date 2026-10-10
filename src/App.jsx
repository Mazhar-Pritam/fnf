import { useState } from "react";
import Dashboard from "./pages/Dashboard.jsx";
import Categories from "./pages/Categories/Index.jsx"; 
import CategoryCreate from "./pages/Categories/Create.jsx"; 
import CategoryEdit from "./pages/Categories/Edit.jsx"; 
import { BrowserRouter, Routes, Route } from "react-router";
import Suppliers from "./pages/Suppliers.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Protected from './Auth/Protected.jsx';
import Logout from './Auth/Logout.jsx';
function App() {
   const [ isSignedIn, setIsSignedIn ] = useState(()=> {
    /* if you want, user will be logged in until they logout*/
    //return localStorage.getItem("access_token") || false;
    /* if you want, user will be logged when they close the browser*/
    return sessionStorage.getItem("access_token") || false;
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

          <Route path= {"/"} element={
            <Protected  isSignedIn= {isSignedIn} >
              <Dashboard /> 
           </Protected>
           } />
        <Route path="/dashboard" element={
          <Protected  isSignedIn= {isSignedIn} >
              <Dashboard /> 
           </Protected>
           }/>
        <Route path="/logout" element={
          <Protected  isSignedIn= {isSignedIn} >
              <Logout /> 
           </Protected>
           }/>
        
        <Route path="categories">
          <Route index element={
          <Protected isSignedIn= {isSignedIn} >
              <Categories /> 
           </Protected>
           }/>
          <Route path="create" element={<CategoryCreate />} />
          <Route path="edit/:id" element={<CategoryEdit />} />
        </Route>

        <Route path="/suppliers" element={<Suppliers />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;