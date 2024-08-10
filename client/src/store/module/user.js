/* eslint-disable no-debugger */
import ResetPassword from '@/pages/auth/ResetPassword.vue';
import Authservice from '../../service/auth'
import userService from '../../service/user.service';
const state ={
  accessToken: localStorage.getItem('accessToken') || null,
  userData: JSON.parse(localStorage.getItem('userData')) || null,
  cart: [],
  order:[],
  address:[],
  iswishlist:false,
  wishlist: [] ,
  users:[],
  user:{},
  statistical:{},

};

const mutations ={
 
  SET_USERS(state,user){
   state.users = user
  },
  SET_STATISTICAL(state,statistical){
    state.statistical = statistical;
  },
  SET_USER(state,user){
    state.user = user
  },
  SET_CART(state, cartItems) {
    state.cart = cartItems;
  },
  SET_WISHLIST(state,wishlist) {
      state.wishlist = wishlist;
  },
  REMOVE_FROM_WISHLIST(state, listItems) {
    state.wishlist = state.wishlist.filter((el)=>el._id !== listItems._id)
  },
  SET_ADDRESS(address){
  state.address=address
  },
  REMOVE_FROM_CART(state, cartItems) {
    state.cart = state.cart.filter((cartItem)=>cartItem._id !== cartItems._id)
  },
  ADD_TO_CART(state, cartItems) {
    state.cart = cartItems;
  },
   
  SET_ACCESS_TOKEN(state, accessToken) {
    state.accessToken = accessToken;
  },
  SET_REGISTER_SUCCESS(user){
   state.user = user
  },
  
  SET_USER_DATA(state, userData) {
    state.userData = userData;
  },
  SET_LOGOUT(state){
    state.accessToken = null;
    state.userData = null;
  },
  LOGIN_ERROR(state,error){
    state.message = error;
  },


};
const actions = {

   async login({commit},{email,password}){
  
      try {
        const response = await Authservice.login(email,password);
          console.log(response);
          const { accessToken, userData,message} = response;

          commit('SET_ACCESS_TOKEN', accessToken);
          commit('SET_USER_DATA', userData);
        
          return response;
      } catch (error) {
        commit('LOGIN_ERROR', error.message);
        console.error(error.message);
      }
      
   },
   async register({commit},payload){
    try {
      const response = await Authservice.register(payload);
        commit('SET_REGISTER_SUCCESS',response)
        return response
    } catch (error) {
      console.log(error);
    }
   },
   async refreshtoken(){
     try {
       const newAccessToken = await Authservice.refreshtoken();
       commit('SET_ACCESS_TOKEN', newAccessToken);
       return newAccessToken;
     } catch (error) {
      console.log(error);
     }
   },
   startTokenRefreshTimer({ dispatch, getters }) {
    const { exp } = getters.User; // Giả sử token chứa thông tin hết hạn exp
    const expiresIn = exp * 1000 - Date.now(); // Chuyển đổi thời gian hết hạn từ giây sang mili giây
    setTimeout(() => {
      dispatch('refreshToken');
    }, expiresIn);
  },
  async forgotPassword({commit},email){
 try {
  const response = await userService.forgotpassword(email)
  const mail = response.message
  console.log(mail)
  return mail
 } catch (error) {
   // Handle error and provide more information
   const errorMessage = error.response?.data?.message || 'An error occurred';
   console.error('Forgot password error:', errorMessage);
   throw new Error(errorMessage);
 }
  },
  async ResetPassword({commit},{token,password}){
    try {
     const response = await userService.resetpassword(token,password)
     const resetpassword = response.mess
     return resetpassword
    } catch (error) {
      // Handle error and provide more information
      const errorMessage = error.response?.data?.message || 'An error occurred';
      console.error('Forgot password error:', errorMessage);
      throw new Error(errorMessage);
    }
     },
  async fetchAllUsers({commit},payload){
    try {
      const response = await userService.getalluser(payload)
      console.log(response.users);
      commit('SET_USERS',response.users)
    } catch (error) {
      console.log(error);
    }
  },
  async fetchcurrentuser({commit},payload){
    try {
      const response = await userService.getcurrentuser(payload)
      console.log(response.result);
      commit('SET_USER_DATA',response.result)
      return response.result
    } catch (error) {
      console.log(error);
    }
  },
  async fetchstatistical({commit},payload){
    try {
      const response = await userService.statistical(payload)
      console.log(response);
      commit('SET_STATISTICAL',response)
    } catch (error) {
      console.log(error);
    }
  },
  async updateUserByAdmin({ commit }, { userId,data }) {
    try {
      const response = await userService.updateuserbyadmin(userId,data);
      const updatedUser = response.updateUserByAdmin; // Correct destructuring based on the API response
      console.log('Updated User:',updatedUser);
      commit('SET_USER',updatedUser);
      return updatedUser;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async getUserById({commit},userId){
    try {
      const response = await userService.getuserbyid(userId)
       const getuser = response.user
       console.log(getuser);
      commit('SET_USER',getuser)
    } catch (error) {
      console.log(error);
    }
  },
  async updatecurrentuser({commit},payload){
    try {
      const response = await userService.updatecurrentuser(payload)
       const updateuser = response.updateUser
       console.log(updateuser);
      commit('SET_USER_DATA',updateuser)
      return updateuser
    } catch (error) {
      console.log(error);
    }
  },
  async logout({commit}){
    try {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userData');
      commit('SET_LOGOUT')
    } catch (error) {
      throw new error
    }
  },
 

  async addProductToCart({commit},cartData){
    try {
     const response = await userService.updatecart(cartData)   
     const updatedCart = response.updatedUser.cart;
            commit('ADD_TO_CART',updatedCart)
            return updatedCart
    } catch (error) {
     console.log(error)
    }
},
async updateAddress({commit},cartData){
  try {
   const response = await userService.updateaddress(cartData)   
   const updatedaddress = response.updateuser;
          commit('SET_ADDRESS',updatedaddress)
          return updatedaddress
  } catch (error) {
   console.log(error)
  }
},
async deleteProductToCart({commit},cartItem){
  try {
    
   const result = await userService.removeproductincart(cartItem.product._id)   
   const removeCart = result.data
   commit('REMOVE_FROM_CART',cartItem)
   console.log(removeCart);
   
   return removeCart
  } catch (error) {
   console.log(error)
  }
},

async updatewishlist({commit},cartItem){
  try {
    
   const result = await userService.updatewishlist(cartItem)   
   const updatewishlist = result.success
   console.log(updatewishlist);
   commit('SET_WISHLIST',updatewishlist)
   return updatewishlist
  } catch (error) {
   console.log(error)
  }
}
,
async fetchcart({commit},cartItems){
 try {
  const response = await userService.getcurrentuser(cartItems)   
  const Cart = response.result.cart
  console.log(Cart);
  Cart.forEach(cartItem => {
    console.log("Cart Item Price:", cartItem.price);
  });
  commit('SET_CART', Cart);
      return Cart
      
 } catch (error) {
  console.log(error)
 }
},
  
  
}
const getters = {
  isAuthenticated: (state) => !!state.accessToken,
  User: (state) => state.userData,
  cart:(state) => state.cart,
  getcart:(state)=> state.cartItems,
  wishlist:(state)=> state.userData?.wishlist,
  users:(state)=> state.users,
  edituser:(state)=> state.user,
  statistical:(state)=> state.statistical
}
export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters,
  };
  