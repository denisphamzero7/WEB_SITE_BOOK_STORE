import HomeLayout from '../layout/HomeLayout.vue'
import HomePage from '../pages/HomeView.vue'
import LoginPage from '../pages/auth/LoginView.vue'
import SignupPage from '../pages/auth/RegisterView.vue'
import UserPage from '../pages/auth/UserView.vue'
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
  

];
// Home.beforeEach((to, from, next) => {
//   const publicPages = ['/login'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');
//   if (authRequired && !loggedIn) {
//     return next('/login');
//   }

//   next();
// });

export default Home;
