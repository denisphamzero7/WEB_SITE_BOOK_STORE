import memberLayout from '../layout/MemberLayout.vue'
import Personal from '../member/index.vue'
import History from '../member/History.vue'
import MyCart from '../member/MyCart.vue'
import Wisllist from '../member/Wisllist.vue'


const Member = [
  {
    path: '/personal',
    name: 'personal',
    component: Personal,
    meta: {
      layout: memberLayout
    }
  },
  {
    path: '/history',
    name: 'history',
    component: History,
    meta: {
      layout: memberLayout
    }
  },
  {
    path: '/mycart',
    name: 'mycart',
    component: MyCart,
    meta: {
      layout: memberLayout
    }
  },
  {
    path: '/wisllist',
    name: 'wisllist',
    component: Wisllist,
    meta: {
      layout: memberLayout
    }
  },
  
  

  

];


export default Member;
