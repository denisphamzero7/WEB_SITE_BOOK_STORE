import AdminLayout from '../layout/AdminLayout.vue'
import Dashboard from '../admin/index.vue'
import Product from '../admin/productmanager/index.vue'
// import Setting from '../admin/setting/index.vue'
import Users from '../admin/usermanager/index.vue'
import edituser from '../admin/usermanager/EditUser.vue'
import Orders from '../admin/ordermanager/index.vue'
import ViewOrder from '../admin/ordermanager/ViewOrder.vue'
import editproduct from '../admin/productmanager/EditProduct.vue'
import createProduct from '../admin/productmanager/CreateProduct.vue'
import news from '../admin/news/index.vue'
import Createnews from '../admin/news/CreateNews.vue'
import Editnews from '../admin/news/EditNews.vue'
const Admin = [
  {
    path: '/admin',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      layout: AdminLayout
    }
  },
  {
    path: '/admin/products',
    name: 'Products',
    component: Product,
    meta: {
      layout: AdminLayout
    }
  },
  {
    path: '/admin/products/:id',
    name: 'Edit-product',
    component: editproduct,
    meta: {
      layout: AdminLayout
    }
  },
  {
    path: '/admin/products',
    name: 'create-product',
    component: createProduct,
    meta: {
      layout: AdminLayout
    }
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: Users,
    meta: {
      layout: AdminLayout
    }
  },
  {
    path: '/admin/users/:id',
    name: 'Edit-User',
    component: edituser,
    meta: {
      layout: AdminLayout
    }
  },

  {
    path: '/admin/news',
    name: 'news-Manager',
    component: news,
    meta: {
      layout: AdminLayout
    }
  },
  {
    path: '/admin/news/:bid',
    name: 'Edit-news',
    component: Editnews,
    meta: {
      layout: AdminLayout
    }
  },
  {
    path: '/admin/news',
    name: 'Create-news',
    component: Createnews,
    meta: {
      layout: AdminLayout
    }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    meta: {
      layout: AdminLayout
    }
  },
  {
    path: '/orders/:oid',
    name: 'View-Order',
    component: ViewOrder,
 
    meta: {
      layout: AdminLayout
    }
  },

];


export default Admin;
