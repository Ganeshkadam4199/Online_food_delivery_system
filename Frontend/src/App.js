import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Home } from './pages/Home';
import { Navbar } from './component/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import { MainPage } from './component/Admin-Navbar/MainPage';
import { AuthGuard } from './guard/auth.guard';
import Categories from './pages/Categories';
import AllFoods from './pages/AllFoods';
import ViewFood from './pages/ViewFood';
import CategoryFood from './pages/CategoryFood';
import { Cart } from './pages/user/Cart';
import OrderSuccess from './pages/user/OrderSuccess';
import Orders from './pages/user/Orders';
import { CardPayment } from './pages/user/CardPayment';
import UnAuthorized from './pages/UnAuthorized';
import EditProfile from './pages/user/EditProfile';
import ViewProfile from './pages/user/ViewProfile';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/category' element={<Categories />}></Route>
        <Route path='/allFood' element={<AllFoods />}></Route>
        <Route path='/viewFood/:id' element={<ViewFood />}></Route>
        <Route path='/viewCategoryFood/:id' element={<CategoryFood />}></Route>


        <Route path='/cart' element={
          <AuthGuard roles={['ROLE_USER']}>
            <Cart />
          </AuthGuard>
        }></Route>


        <Route path='/orderSucc' element={
          <AuthGuard roles={['ROLE_USER']}>
            <OrderSuccess />
          </AuthGuard>
        }></Route>
        <Route path='/orders' element={
          <AuthGuard roles={['ROLE_USER']}>
            <Orders />
          </AuthGuard>
        }></Route>

        <Route path='/cardPayment/:pr' element={
          <AuthGuard roles={['ROLE_USER']}>
            <CardPayment />
          </AuthGuard>
        }></Route>


        <Route path='/editProfile' element={<EditProfile />}></Route>
        <Route path='/viewProfile' element={<ViewProfile />}></Route>






        {/* <Route path="*" element={<NotFound />} /> */}
        <Route path="401" element={<UnAuthorized />} />

        <Route path='/admin/*' element={
          <AuthGuard roles={['ROLE_ADMIN']}>
            <MainPage />
          </AuthGuard>
        }>
        </Route>

      </Routes>



    </BrowserRouter>)
}

export default App;
