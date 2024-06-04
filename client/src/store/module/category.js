
import CategoryProductService from '../../service/category'
const state = {
    category: [],
    author:null
  };
  
  const mutations = {
    SET_CATEGORY(state,category) {
      state.category = category;
    },
  };
  
  const actions = {
    async fetchCategory({ commit }) {
      try {
        const response = await CategoryProductService.getcategory();
        console.log(response.getproductcategory);
        commit('SET_CATEGORY',response.getproductcategory);
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    },
  };
  const getters = {
    allCategory: (state) => state.category,
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  };
  