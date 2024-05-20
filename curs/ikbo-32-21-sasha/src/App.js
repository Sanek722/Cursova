import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Profile_page from './Pages/Profile';
import Products from './Pages/Product';
import Main_page from './Pages/Main';
import Tech_page from './Pages/Tech_page';
import Transfer_page from './Pages/Transfer_page';
import Basket_page from './Pages/Basket_page';
import Admin_page from './Pages/admin'
import AdminAcess from './Pages/AdminAcess';

const App = () => {
  return (
      <div>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile_page />} />
          <Route path="/product" element={<Products />} />
          <Route path="/main" element={<Main_page />} />
          {/* <Route path="/tech" element={<Tech_page />} />
          <Route path="/transfer" element={<Transfer_page />} /> */}
          <Route path="/basket" element={<Basket_page />} />
          <Route path="/admin" element={<AdminAcess component={Admin_page} />} /> 
        </Routes>
      </div>
  );
};

export default App;
