import {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route, Routes} from 'react-router-dom';

import './App.css';

import AppNavbar from './components/AppNavbar';
import TopBanner from './components/TopBanner';
import Footer from './components/Footer'


import AdminProduct from './pages/AdminProduct'
import CatProducts from './pages/CatProducts'
import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './pages/Logout'
import NotFound from './pages/NotFound';
import OrderView from './pages/OrderView'
import Products from './pages/Products'
import ProductView from './pages/ProductView'
import Register from './pages/Register';


import {UserProvider} from './UserContext';


function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })

  const unsetUser = () => {
    localStorage.clear();
  }

 /* useEffect(()=> {
    console.log(user)
    console.log(localStorage)
  }, [user])*/

  useEffect(() => {

    let token = localStorage.getItem('token'); 

    fetch('http://localhost:4000/users/details', {
      method: 'GET',
      headers: {
        Authorization : `Bearer ${token}`
      }
    })
    .then(res=> res.json())
    .then(data => {
      //console.log(data)

      if(typeof data._id !== "undefined"){
        setUser({
          id: data._id,
          isAdmin: data.isAdmin
        })
      } else {
        setUser ({
          id: null,
          isAdmin: null
        })
      }
    })
  }, [])

  return (
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
        <Container fluid className= "px-0 main-container">
          <TopBanner/>
          <AppNavbar/>
            <Routes>
              <Route exact path ="/" element={<Home/>}/>
             
              <Route exact path = "/AdminProduct" element={<AdminProduct/>}/>
              <Route exact path = "products/categories/:category" element={<CatProducts/>}/>
              <Route exact path ="/login" element={<Login/>}/>
              <Route exact path ="/logout" element={<Logout/>}/>
              <Route exact path = "/products" element={<Products/>}/>
              <Route exact path = "/products/:productId" element={<ProductView/>}/>
              <Route exact path = "/myOrder" element={<OrderView/>}/>
              <Route exact path = "/register"element={<Register/>}/>
              <Route path= "*" element= {<NotFound/>} />
            </Routes>
        </Container>
        <footer className="-footer-pin">
          <Footer/> 
        </footer>
      </Router>
    </UserProvider>
  );
}

export default App;
