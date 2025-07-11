import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Header from './Components/Header'; // User-facing Header
import Footer from './Components/Footer'; // User-facing Footer
import Home from './Components/Home/Home';
import Login from './pages/login/Login';
import WishlistPage from './pages/wishlist';
import CartPage from './pages/cart/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import Account from './pages/profile/Account';
import ChangePasswordPage from './pages/profile/ChangePassword';
import ShippingAddress from './pages/profile/ShippingAddress';
import MyOrders from './pages/profile/MyOrders';
import Notification from './pages/profile/Notification';
import Profile from './pages/profile/Profile';
import ReturnOrder from './pages/profile/returnorder';
import ExchangeOrder from './pages/profile/exchangeorder';
import UsingEmail from './pages/ForgotPassword/UsingEmail';
import UsingPhone from './pages/ForgotPassword/UsingPhone';
import VP from "./pages/VPage/VerificationPage";
import VN from "./pages/VNumber/VerificationNumber";
import SP from "./pages/Signup/Signup";
import PaymentFlow from './Components/PaymentSteps/PaymentFlow';
import OrderConfirmation from './Components/Checkout/Checkout1';

// Import the new AdminLayout component

import AdminLayout from './Components/AdminLayout';

// Admin Pages Imports

import Homeadmin from './admin/pages/home/home';
import Pos from './admin/pages/pos/Pos';
import Purchase from "./pages/Purchases/purchase/Purchase";
import OrderTable from './pages/OnlineOrders/OrderTable';
import Subscriber from './pages/subscriber/Subscriber';
import ProductReports from './pages/Reportpage/ProductReports';
import Customers from './pages/customerpage/Customers';
import CreditBalanceReports from './pages/Credit Balance Report/CreditBalanceReports';
import Coupons from './pages/E-Coupons/Coupons';
import TransactionPage from './pages/Transactions/Transactions';
import Administrators from './pages/administrators/Administrators';
import DamageTShirt from './pages/salesreport/DamageTShirt';
import ProductSection from './pages/ProductSection/ProductSection';
import Employees from './pages/Employees/Employees';
import PosOrder from './pages/posorder/PosOrders';
import ReturnPage from './pages/ReturnAndRefund/ReturnPage';
import ReturnDetails from './pages/ReturnAndRefund/ReturnDetails';
import PushNotifications from './pages/PushNotification/PushNotifications';
import Stocks from './pages/Stocks/ProductList';
import Damage from './pages/damage/damage';
import Promotion from './pages/promotion/promotion';
import ProductDashboard from "./pages/product/promotion";
import ViewProductPage from "./pages/product/ViewPromotion";
import Returnorder from './pages/Returnorder/page/ReturnOrder';


const Layout = ({ children }) => {
  const location = useLocation();
  // This condition hides the *user-facing* Header and Footer for login and admin paths
  const hideHeaderFooter = location.pathname === '/login' || location.pathname.startsWith('/admin');

  return (
    <>
      {!hideHeaderFooter && <Header />} {/* User-facing Header */}
      <main>{children}</main>
      {!hideHeaderFooter && <Footer />} {/* User-facing Footer */}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ---- Routes without any Header & Footer (e.g., login, signup) ---- */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SP />} />
        <Route path='/using-email' element={<UsingEmail />} />
        <Route path='/using-phone' element={<UsingPhone />} />
        <Route path="/verification" element={<VP />} />
        <Route path="/verification-number" element={<VN />} />

        {/* ---- Admin Routes with AdminLayout (includes Admin-specific Header & Sidebar) ---- */}
        <Route
          path="/admin/*" // All paths starting with /admin/ will use this layout
          element={
            <AdminLayout> {/* Wrap nested admin routes with AdminLayout */}
              <Routes>
                <Route path="" element={<Homeadmin />} />
                
                <Route path="Pos" element={<Pos />} />
                <Route path="PosOrder" element={<PosOrder />} />
                <Route path="PushNotifications" element={<PushNotifications />} />
                {/* <Route path="SPage" element={<SPage />} /> */}
                <Route path="Purchase" element={<Purchase />} />
                <Route path="OnlineOrders" element={<OrderTable />} />
                <Route path="Subscriber" element={<Subscriber />} />
                <Route path="ProductReports" element={<ProductReports />} />
                <Route path="CreditBalanceReports" element={<CreditBalanceReports />} />
                <Route path="Coupons" element={<Coupons />} />
                <Route path="Transactions" element={<TransactionPage />} />
                <Route path="Administrators" element={<Administrators />} />
                <Route path="SalesReport" element={<DamageTShirt />} />
                <Route path="Employees" element={<Employees />} />
                <Route path="Customers" element={<Customers />} />
                <Route path="ReturnPage" element={<ReturnPage />} />
                <Route path="returns/:orderId" element={<ReturnDetails />} />
                <Route path="Stocks" element={<Stocks />} />
                <Route path="/products" element={<ProductDashboard />} />
                <Route path="/products/view/:id" element={<ViewProductPage />} />
                <Route path="damage" element={<Damage />} />
                <Route path="Promotion" element={<Promotion />} />
                <Route path="ProductSection" element={<ProductSection />} />
                <Route path="Returnorder" element={<Returnorder />} />
                {/* Add other admin routes here */}
              </Routes>
            </AdminLayout>
          }
        />

        {/* ---- User-facing Routes with standard Layout (includes User-facing Header & Footer) --- */}
        <Route
          path="*" // All other paths will use this layout
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/WishlistPage" element={<WishlistPage />} />
                <Route path="/CartPage" element={<CartPage />} />
                <Route path="/ReturnOrder" element={<ReturnOrder />} />
                <Route path="/ExchangeOrder" element={<ExchangeOrder />} />
                <Route path="/PaymentFlow" element={<PaymentFlow />} />
                <Route path="/checkout" element={<OrderConfirmation />} />

                {/* --- Profile pages with nested routes and their own sidebar --- */}
                <Route path="/Profile" element={<Profile />}>
                  <Route index element={<Account />} />
                  <Route path="ChangePassword" element={<ChangePasswordPage />} />
                  <Route path="ShippingAddress" element={<ShippingAddress />} />
                  <Route path="MyOrders" element={<MyOrders />} />
                  <Route path="Notification" element={<Notification />} />
                </Route>
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;