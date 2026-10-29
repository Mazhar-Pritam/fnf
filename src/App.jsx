import { useState } from "react";
//import Dashboard from "./pages/Dashboard.jsx";
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
import Parts from "./pages/Parts/Index.jsx";
import PartCreate from "./pages/Parts/Create.jsx";
import PartEdit from "./pages/Parts/Edit.jsx";
import Inventory from "./pages/Inventory/Index.jsx";
import SalesIndex from "./pages/Sales/Index.jsx";
import SaleCreate from "./pages/Sales/Create.jsx";
import SaleEdit from "./pages/Sales/Edit.jsx";
import PurchaseVoucher from "./pages/Purchases/Voucher.jsx";
import SaleVoucher from "./pages/Sales/Voucher.jsx";
import PurchaseReturns from "./pages/PurchaseReturns/Index.jsx";
import PurchaseReturnCreate from "./pages/PurchaseReturns/Create.jsx";
import PurchaseReturnEdit from "./pages/PurchaseReturns/Edit.jsx";
import PurchaseReturnVoucher from "./pages/PurchaseReturns/Voucher.jsx";
import SaleReturns from "./pages/SaleReturns/Index.jsx";
import SaleReturnCreate from "./pages/SaleReturns/Create.jsx";
import SaleReturnEdit from "./pages/SaleReturns/Edit.jsx";
import SaleReturnVoucher from "./pages/SaleReturns/Voucher.jsx";
import Payments from "./pages/Payments/Index.jsx";
import PaymentCreate from "./pages/Payments/Create.jsx";
import PaymentEdit from "./pages/Payments/Edit.jsx";
import Expenses from "./pages/Expenses/Index.jsx";
import ExpenseCreate from "./pages/Expenses/Create.jsx";
import ExpenseEdit from "./pages/Expenses/Edit.jsx";
import Accounts from "./pages/Accounts/Index.jsx";
import Ledger from "./pages/Accounts/Ledger.jsx";
import ProfitLoss from "./pages/Reports/ProfitLoss.jsx";
import SalesReport from "./pages/Reports/SalesReport.jsx";
import PurchaseReport from "./pages/Reports/PurchaseReport.jsx";
import Dashboard from "./pages/Dashboard/Index.jsx";
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
           {/* <Route path="dashboard" element={<Dashboard />} /> */}
           <Route path="/" element={<Dashboard />} />
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

        <Route path="inventory" element={<Inventory />} />

           <Route path="parts">
            <Route index element={<Parts />} />
            <Route path="create" element={<PartCreate />} />
            <Route path="edit/:id" element={<PartEdit />} />
          </Route>
                  <Route path="purchases">
            <Route index element={<Purchases />} />
            <Route path="create" element={<PurchaseCreate />} />
            <Route path="edit/:id" element={<PurchaseEdit />} />
               <Route path="view/:id" element={<PurchaseVoucher />} />
          </Route>
             <Route path="sales">
              <Route index element={<SalesIndex />} />
              <Route path="create" element={<SaleCreate />} />
              <Route path="edit/:id" element={<SaleEdit />} />
              <Route path="view/:id" element={<SaleVoucher />} />
            </Route>
               <Route path="purchase-returns">
                <Route index element={<PurchaseReturns />} />
                <Route path="create" element={<PurchaseReturnCreate />} />
                <Route path="edit/:id" element={<PurchaseReturnEdit />} />
                <Route path="view/:id" element={<PurchaseReturnVoucher />} />
              </Route>
              <Route path="sale-returns">
                <Route index element={<SaleReturns />} />
                <Route path="create" element={<SaleReturnCreate />} />
                <Route path="edit/:id" element={<SaleReturnEdit />} />
                <Route path="view/:id" element={<SaleReturnVoucher />} />
              </Route>
                 <Route path="payments">
                      <Route index element={<Payments />} />
                      <Route path="create" element={<PaymentCreate />} />
                      <Route path="edit/:id" element={<PaymentEdit />} />
                    </Route>
                    <Route path="expenses">
                      <Route index element={<Expenses />} />
                      <Route path="create" element={<ExpenseCreate />} />
                      <Route path="edit/:id" element={<ExpenseEdit />} />
                    </Route>
                    <Route path="accounts" element={<Accounts />} />
                    <Route path="accounts/ledger" element={<Ledger />} />
                    <Route path="reports/profit-loss" element={<ProfitLoss />} />
                    <Route path="reports/sales" element={<SalesReport />} />
                    <Route path="reports/purchases" element={<PurchaseReport />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;