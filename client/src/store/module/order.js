
import OrderService  from '../../service/order'
const state = {
    orders: [],
    ordersadmin:[],
    statusorder:'',
    order:'',
  };
  
  const mutations = {
    SET_ORDER(state,order){
        state.orders =order;
     },
  
     SEARCH_ORDER(state,order){
      state.orders =order;
     },
     SET_ORDERADMIN(state,order){
      state.ordersadmin =order;
     },
     SET_STATUS_ORDER(state,order){
      state.statusorder =order;
     },
     SET_AN_ORDER(state,order){
      state.order =order;
     }
    
  };
  
  const actions = {
    async fetchOrder({ commit }) {
      try {
        const response = await OrderService.getuserorder();
        console.log(response.orders);
        const userorder = response.orders;
        commit('SET_ORDER',userorder);
        return userorder;
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    },
    async fetchOrdersByadmin({ commit }) {
      try {
        const response = await OrderService.getordersbyadmin();
        console.log(response.orders);
        const userorder = response.orders;
        commit('SET_ORDER',userorder);
        return userorder;
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    },

    async getorderbystatus({ commit },data) {
      try {
        const response = await OrderService.searchorderbystatus(data);
        console.log(response.orders);
        const userorder = response.orders;
        commit('SET_ORDER',userorder);
        return userorder;
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    },
    async updateOrderStatus({ commit },{oid,status}) {
      try {
        const response = await OrderService.updateOrderStatus(oid,status);
        console.log(response.data);
        const userorder = response.data;
        commit('SET_STATUS_ORDER',userorder);
        return userorder;
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    },
    async orderproduct({commit},product){
        try {
         const response = await OrderService.order(product)   
         const order = response.data;
         console.log(order);
          commit('SEARCH_ORDER',order)
                return order
        } catch (error) {
         console.log(error)
        }
    },
    async getAnOrder({commit},oid){
      try {
       const response = await OrderService.getAnorder(oid)   
       const order = response.order;
       console.log(order);
        commit('SET_AN_ORDER',order)
        return order
      } catch (error) {
       console.log(error)
      }
  },

  };
  const getters = {
    Order: (state) => state.orders,
    getorderbystatus:(state) => state.orders,
    statusorder:(state)=>state.statusorder,
    order:(state)=>state.order
  };

  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  };
  