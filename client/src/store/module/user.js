/* eslint-disable no-debugger */
import Authservice from '../../service/auth'
import userService from '@/service/user.service';
const state ={
  accessToken: localStorage.getItem('accessToken') || null,
  userData: JSON.parse(localStorage.getItem('userData')) || null
   
};

const mutations ={
  SET_ACCESS_TOKEN(state, accessToken) {
    state.accessToken = accessToken;
  },

  SET_USER_DATA(state, userData) {
    state.userData = userData;
  },
  SET_LOGOUT(state){
    state.accessToken = null;
    state.userData = null;
  }

};
const actions = {
   async login({commit},{email,password}){
  
      try {
        const response = await Authservice.login(email,password);
          console.log(response);
          const { accessToken, userData } = response;

          commit('SET_ACCESS_TOKEN', accessToken);
          commit('SET_USER_DATA', userData);
          return response;
      } catch (error) {
        console.log(error)
      }
      
   },
   async register({commit},payload){
    try {
      const response = await Authservice.register(payload);
       console.log(response);
        commit('SET_REGISTER_SUCCESS',response)
    } catch (error) {
      console.log(error);
    }
   },
   async refeshtoken(token,callback){
     try {
       const response = await Authservice.refeshtoken(token,callback);
        console.log(response);
     } catch (error) {
      console.log(error);
     }
   },
  async getcurrentuser({commit},payload){
    try {
      const response = await userService.getcurrentuser(payload)
      console.log(response);
      commit('SET_USER',response)
      return response
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
  }
   
}
const getters = {
  isAuthenticated: (state) => !!state.accessToken,
  User: (state) => state.userData,
}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters,
  };
  