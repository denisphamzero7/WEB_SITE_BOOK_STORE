import { createStore } from 'vuex';
import user from './module/user';
import banner from './module/banner';
import product from './module/product';
import toast from './module/toast'
import order from './module/order';
import author from './module/author';
import publisher from './module/publisher';
import category from './module/category';
import news from './module/news'
const store = createStore({
    modules:{
        user,
        banner,
        product,
        toast,
        order,
        author,
        publisher,
        category,
        news
    }
})
export default store;