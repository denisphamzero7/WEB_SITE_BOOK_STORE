import BannerService  from '../../service/banner'
const state = {
    banners: [],
  };
  
  const mutations = {
    SET_BANNER(state, banners) {
      state.banners = banners;
    },
  };
  
  const actions = {
    async fetchBanner({ commit }) {
      try {
        const response = await BannerService.getbanners();
        console.log(response);
        const banners = response.data
        commit('SET_BANNER',banners);
      } catch (error) {
        console.error('Error fetching banner:', error);
      }
    },
  };
  const getters = {
    getBanner: (state) => state.banners,
    getImagesByName: (state) => (name) => {
        const banner = state.banners.find((banner) => banner.name === name);
        return banner ? banner.images : [];
      },
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  };
  