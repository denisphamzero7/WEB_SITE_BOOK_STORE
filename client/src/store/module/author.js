import AuthorService from '../../service/author'
const state = {
    authors: [],
    author:null
  };
  
  const mutations = {
    SET_AUTHOR(state,author) {
      state.authors = author;
    },
  };
  
  const actions = {
    async fetchAuthors({ commit }) {
      try {
        const response = await AuthorService.getAuthor();
        console.log(response.data);
        commit('SET_AUTHOR',response.data);
      } catch (error) {
        console.error('Error fetching banner:', error);
      }
    },
  };
  const getters = {
    allAuthors: (state) => state.authors,
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  };
  