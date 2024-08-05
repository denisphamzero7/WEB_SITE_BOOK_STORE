import NewsService  from '../../service/news'

const state = {
    news: [],
    annews: {}
};

const mutations = {
    SET_NEWS(state, news) {
        state.news = news;
    },
    SET_AN_NEWS(state, news) {
        state.news = news;
    }
};

const actions = {
    async fetchnews({ commit }) {
        try {
            const response = await NewsService.getnews();
            commit('SET_NEWS', response.news);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    },
    async getAnNews({ commit }, payload) {
        try {
            const response = await NewsService.getannews(payload);
            commit('SET_AN_NEWS', response.rs);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    },
    async deleteAnnews({ commit }, payload) {
        try {
            const response = await NewsService.deleteannews(payload);
            commit('SET_NEWS', response);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    },
    async createnews({ commit }, payload) {
        try {
            const response = await NewsService.createnews(payload);
            console.log(response);
            commit('SET_news', response);
        } catch (error) {
            console.error('Error new newss:', error);
        }
    },
    async updatenews({ commit }, { bid, data }) {
        try {
            const response = await NewsService.updatenews(bid, data); // Corrected
            console.log(response.updatenews);
            commit('SET_news', response.updatenews);
        } catch (error) {
            console.error('Error updating news:', error); // Updated error message
        }
    },

};

const getters = {
    news: (state) => state.news,
    getnews: (state) => state.news
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
