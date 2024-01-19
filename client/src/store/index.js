import { createStore } from 'vuex';
import user from './module/user';
import banner from './module/banner';
const store = createStore({
    modules:{
        user,
        banner
    }
})
export default store