import PublisherService from '../../service/publisher'
const state = {
    publishers: [],
  
  };
  
  const mutations = {
    SET_PUBLISHER(state,publisher) {
      state.publishers = publisher;
    },
  };
  
  const actions = {
    async fetchPublisher({ commit }) {
      try {
        const response = await PublisherService.getPublisher();
        console.log(response.data);
        commit('SET_PUBLISHER',response.data);
      } catch (error) {
        console.error('Error fetching banner:', error);
      }
    },
  };
  const getters = {
    allPublishers: (state) => state.publishers,
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  };
  