import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Login from './screens/Shared/Login/Login';
import Register from './screens/Shared/Register/Register';
import IndexProduct from './screens/Product/IndexProduct';
import IndexShop from './screens/Shop/IndexShop';
import Cart from './screens/Cart/Cart';
import { useEffect } from 'react';
import { authActions } from './store/auth-slice';
import AddProduct from './screens/Product/AddProduct';
import axios from 'axios';

function App() {
  const state = useSelector((s) => s);

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/users')
        dispatch(authActions.initUsers(data))
        let obj = localStorage.getItem('auth');
        if (obj !== null) {
          const auth = JSON.parse(obj);
          dispatch(authActions.login({ email: auth.email, password: auth.password }))
        }
      } catch (error) {
        console.error(error);
      }
    }
    getData()


  }, [])
  const routes = {
    unauth:
      <>
        < Route key={0} path='/*' element={<Login />} />
        < Route key={1} path='/login' element={<Login />} />
        <Route key={2} path='/register' element={<Register />} />
      </>
    ,
    admin:
      <>
        < Route key={0} path='/*' element={<IndexProduct />} />
        < Route key={1} path='/product/add' element={<AddProduct />} />
      </>
    ,
    client:
      <>
        < Route key={0} path='/*' element={<IndexShop />} />
        < Route key={1} path='/cart' element={<Cart />} />
      </>

  }
  const getRoutes = (role_id) => {
    switch (role_id) {
      case 1:
        return routes.admin
      case 2:
        return routes.client
      default:
        return routes.unauth
    }
  }


  return (
    <BrowserRouter>
      <Navbar auth={state.auth} />
      <Routes>
        {
          getRoutes(state.auth.isLoggedIn === true ? state.auth.user.roleId : 0)
        }
      </Routes>
    </BrowserRouter >
  );
}

export default App;
