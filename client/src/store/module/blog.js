import BlogService  from '../../service/blog'
const state = {
    blogs: [],
    blog:{}
  };
  
  const mutations = {
    SET_BLOGS(state,blog) {
      state.blogs = blog;
    },
    SET_BLOG(state,blog){
        state.blog = blog;
    }
  };
  
  const actions = {
    async fetchBlog({ commit }) {
      try {
        const response = await BlogService.getblogs();
        commit('SET_BLOGS',response.blog);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    },
    async getAnBlog({ commit },payload) {
        try {
          const response = await BlogService.getanblogs(payload);
          commit('SET_BLOG',response.rs);
        } catch (error) {
          console.error('Error fetching blogs:', error);
        }
      },
      async deleteAnBlog({ commit },payload) {
        try {
          const response = await BlogService.deleteanblog(payload);
          commit('SET_BLOGS',response);
        } catch (error) {
          console.error('Error fetching blogs:', error);
        }
      },
      async createBlog({ commit },payload) {
        try {
          const response = await BlogService.createblogs(payload);
          console.log(response);
          commit('SET_BLOG',response);
        } catch (error) {
          console.error('Error new blogs:', error);
        }
      },
      async updateBlog({ commit },payload) {
        try {
          const response = await BlogService.updateblogs(payload);
          console.log(response.updateblog);
          commit('SET_BLOG',response.updateblog);
        } catch (error) {
          console.error('Error new blogs:', error);
        }
      },

  };
  const getters = {
    blogs: (state) => state.blogs,
    getblog: (state) => state.blog
    
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  };
  