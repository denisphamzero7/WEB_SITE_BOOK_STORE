import HomeLayout from '../layout/HomeLayout.vue'

import HomePage from '../pages/HomeView.vue'
import LoginPage from '../pages/auth/LoginView.vue'
import SignupPage from '../pages/auth/RegisterView.vue'
import UserPage from '../pages/auth/UserView.vue'
import CartProduct from '../pages/Cart-Product.vue'
import ProductPage from '../pages/Product-View.vue'
import DetailProduct from '.././components/Product-Detail.vue'
import CheckOut from '../pages/CheckOut.vue'
import News from '../pages/News.vue'
import HelpPage from '../pages/Help.vue'
import ResetPassword from '../pages/auth/ResetPassword.vue'
const Home = [
  {
    path: '/',
    name: 'Home-Page',
    component: HomePage,
    meta: {
      layout: HomeLayout
    }
  },
  {
    path: '/resetpassword',
    name: 'Reset-Password',
    component: ResetPassword,
    meta: {
      layout: HomeLayout
    }
  },
  {
    path: '/cart',
    name: 'cartproduct-page',
    component: CartProduct,
    meta: {
      layout: HomeLayout
    }
  },
  {
    path: '/news',
    name: 'news-page',
    component: News,
    meta: {
      layout: HomeLayout
    }
  },
  {
    path: '/helpers',
    name: 'Helps-page',
    component:HelpPage,
    meta: {
      layout: HomeLayout
    }
  },
  {
    path: '/login',
    name: 'Login-Page',
    component: LoginPage,
    meta: {
      layout: HomeLayout
    }
  },
  {
    path: '/signup',
    name: 'signup-Page',
    component: SignupPage,
    meta: {
      layout: HomeLayout
    }
  },
  {
    path: '/user',
    name: 'User-Page',
    component: UserPage,
    meta: {
      layout: HomeLayout
    }
  },
  {
    path: '/products',
    name: 'products-Page',
    component: ProductPage,
    meta: {
      layout: HomeLayout
    }
  },
  {
    path: `/products/:id`,
    name: 'detail-product',
    component: DetailProduct,
    meta: {
      layout: HomeLayout
    }
  },
  {
    path: `/checkout`,
    name: 'check-out',
    component: CheckOut,
    meta: {
      layout: HomeLayout
    }
  },
  

  

];


export default Home;
