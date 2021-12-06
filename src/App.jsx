import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import History from './pages/History';
import ProductDetail from './pages/ProductDetail';
import 'bootstrap/dist/css/bootstrap.css';
import MyNavbar from './components/MyNavbar';
import {connect} from 'react-redux';
import {userKeepLogin, checkStorage} from './redux/actions/user';
import {getCartData} from './redux/actions/cart'

class App extends React.Component {

  componentDidMount() {
    const userLocalStorage = localStorage.getItem("userDataEmerce")

    if (userLocalStorage) {
      const userData = JSON.parse(userLocalStorage)
      this.props.userKeepLogin(userData)
      this.props.getCartData(userData.id)
    } else {
      this.props.checkStorage();
    }
  }

  render() {
    if (this.props.userGlobal.storageIsChecked) {    
      return (
        <BrowserRouter>
        <MyNavbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/history' element={<History />} />
            <Route path='/product-detail/:productId' element={<ProductDetail />} />
          </Routes>
        </BrowserRouter>
      )
    }
    return (
      <div>
        Loading...
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user
  }
}

const mapDispatchToProps = {
  userKeepLogin,
  checkStorage,
  getCartData
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
