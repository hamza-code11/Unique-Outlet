import { Routes, Route } from "react-router-dom";
import Home from "./pages/web/Home";
import Shop from "./pages/web/Shop";
import Cart from "./pages/web/Cart";
import Checkout from "./pages/web/Checkout";
import OrderConfirmation from "./pages/web/OrderConfirmation";
import Contact from "./pages/web/Contact";
import Product from "./pages/web/ProductPage";
import SignIn from "./pages/web/SignIn";
import Register from "./pages/web/Register";
import About from "./pages/web/About";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

import FlavourList from './pages/admin/flavours/FlavourList';
import FlavourCreate from './pages/admin/flavours/FlavourCreate';
import FlavourEdit from './pages/admin/flavours/FlavourEdit';

import OrdersHistory from './pages/web/OrdersHistory';


import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEditProfile from "./pages/admin/AdminEditProfile";
// Categories
import CategoryList from "./pages/admin/categories/CategoryList";
import CategoryCreate from "./pages/admin/categories/CategoryCreate";
import CategoryEdit from "./pages/admin/categories/CategoryEdit";

// subcategories
import SubCategoryList from "./pages/admin/subcategories/SubCategoryList";
import SubCategoryCreate from "./pages/admin/subcategories/SubCategoryCreate";
import SubCategoryEdit from "./pages/admin/subcategories/SubCategoryEdit";

// products
import ProductList from "./pages/admin/products/ProductList";
import ProductCreate from "./pages/admin/products/ProductCreate";
import ProductEdit from "./pages/admin/products/ProductEdit";

// orders
import OrderList from "./pages/admin/orders/OrderList";
// import OrderCreate from "./pages/admin/orders/OrderCreate";
import OrderDetails from "./pages/admin/orders/OrderDetails";

// customers
import CustomerList from "./pages/admin/customers/CustomerList";

// managements
// import InvoiceList from "./pages/admin/managements/InvoiceList";
// import InvoiceDetails from "./pages/admin/managements/InvoiceDetails";
import ContactMessages from "./pages/admin/managements/ContactMessages";

// reports
// import SalesReport from "./pages/admin/reports/SalesReport";
// import ProductReport from "./pages/admin/reports/ProductReport";
// import CustomerReport from "./pages/admin/reports/CustomerReport";

// CMS
import HomeCMS from "./pages/admin/cms/HomeCMS";
import FooterCMS from "./pages/admin/cms/FooterCMS";
import NavbarCMS from "./pages/admin/cms/NavbarCMS.jsx";

import GoogleCallback from "./pages/web/GoogleCallback";
import { CartProvider } from './context/CartContext';




const App = () => {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/checkout" element={<PrivateRoute> <Checkout /> </PrivateRoute>} />
        <Route path="//order/:orderId" element={<PrivateRoute> <OrderConfirmation /> </PrivateRoute>} />
        <Route path="/orders" element={<PrivateRoute> <OrdersHistory /> </PrivateRoute>} />

        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:id" element={<Product />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />

        {/* <Route path="/checkout" element={<Checkout />} />
        <Route path="/order/:orderId" element={<OrderConfirmation />} /> */}

        <Route path="/auth/google/callback" element={<GoogleCallback />} />



        <Route path="/admin" element={<AdminRoute> <AdminLayout /> </AdminRoute>}>

          <Route index element={<AdminDashboard />} />
          <Route path="profile" element={<AdminEditProfile />} />

          {/* Categories */}
          <Route path="categories" element={<CategoryList />} />
          <Route path="categories/create" element={<CategoryCreate />} />
          <Route path="categories/edit/:id" element={<CategoryEdit />} />

          {/* Subcategories */}
          <Route path="subcategories" element={<SubCategoryList />} />
          <Route path="subcategories/create" element={<SubCategoryCreate />} />
          <Route path="subcategories/edit/:id" element={<SubCategoryEdit />} />

          {/* Products */}
          <Route path="products" element={<ProductList />} />
          <Route path="products/create" element={<ProductCreate />} />
          <Route path="products/edit/:id" element={<ProductEdit />} />

          {/* Orders */}
          <Route path="orders" element={<OrderList />} />
          {/* <Route path="orders/create" element={<OrderCreate />} /> */}
          <Route path="orders/:id" element={<OrderDetails />} />

          {/* Customers */}
          <Route path="customers" element={<CustomerList />} />

          {/* Management */}
          {/* <Route path="invoices" element={<InvoiceList />} />
          <Route path="invoices/:id" element={<InvoiceDetails />} /> */}
          <Route path="contact-messages" element={<ContactMessages />} />

          {/* Reports */}
          {/* <Route path="reports/sales" element={<SalesReport />} />
          <Route path="reports/products" element={<ProductReport />} />
          <Route path="reports/customers" element={<CustomerReport />} /> */}

          {/* CMS Pages */}
          <Route path="cms/home" element={<HomeCMS />} />
          <Route path="cms/footer" element={<FooterCMS />} />
          <Route path="cms/navbar" element={<NavbarCMS />} />


          <Route path="flavours" element={<FlavourList />} />
          <Route path="flavours/add" element={<FlavourCreate />} />
          <Route path="flavours/edit/:id" element={<FlavourEdit />} />
        </Route>


      </Routes>
    </CartProvider>
  );
};

export default App;
