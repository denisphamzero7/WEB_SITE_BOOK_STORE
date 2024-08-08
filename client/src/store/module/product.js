
import ProductService from '../../service/product'
import BookCategoryService from '@/service/bookcategory'
const state = {
  products: [],
  featuredProducts: [],
  isModalOpen: false,
  selectedProduct: null,
  countProducts: 1,
  rating: 0,
  productDetail: null,
  related:[],
  product:null,
  error:null,
  loading:false,
  bookcategory:[],
  recommendedProducts: [],
}
const getters = {
  recommendedProducts: (state) => state.recommendedProducts,
  getProductDetail: (state) => state.productDetail,
  getProducts: (state) => state.products,
  getFeaturedProducts: (state) => state.featuredProducts,
  isModalOpen: (state) => state.isModalOpen,
  selectedProduct: (state) => state.selectedProduct,
  getcountproducts: (state) => state.countProducts,
  getrating: (state) => state.rating,
  getproductbysearch:(state)=> state.products,
  error:(state)=>state.error,
  getproduct:(state)=>state.product,
  loading:(state)=>state.loading,
  allbookcategory:(state)=>state.bookcategory
}
const mutations = {
  SET_RECOMMENDED_PRODUCTS(state, products) {
    state.recommendedProducts = products;
  },
  SETBOOKCATEGORY(state,bookcategory){
    state.bookcategory=bookcategory
  },
  SET_LOADING(state,loading){
    state.loading=loading
  },
  SET_RELATED_PRODUCTS(state, products) {
    state.related = products;
  },
  SET_RATING(state, rating) {
    state.rating = rating
  },
 SET_ERROR(state,error){
  state.error= error
 }
  ,
  SET_PRODUCT_BY_ID(state, product){
    state.productDetail = product;
  },
   SET_PRODUCT(state,product){
      state.products = product
   },
   SET_AN_PRODUCT(state,product){
    state.product = product
   },
   SEARCH_PRODUCT(state,name){
    state.products = name
 },

  SET_FEATURED_PRODUCT(state, product) {
    state.featuredProducts = product
  },
  OPEN_MODAL(state, product) {
    state.isModalOpen = true
    state.selectedProduct = product;
   
  },
  CLOSE_MODAL(state) {
    state.isModalOpen = false
    state.selectedProduct = null
  },
  INCREMENT_COUNT(state) {
   if(state.countProducts<state.selectedProduct.quantity){
    state.countProducts ++
   }
  },
  DECREMENT_COUNT(state) {
    if (state.countProducts > 1) {
      state.countProducts--
    }
  },
  RESET_COUNT(state) {
    state.countProducts = 1
  }
}
const actions = {
  async fetchBookCategory({ commit },payload) {
    try {
      const response = await BookCategoryService.getbookcategory(payload)
      console.log(response.BookCategory)
      commit('SETBOOKCATEGORY', response.BookCategory)
    } catch (error) {
      console.log(error)
    }
  },

  async fetchProduct({ commit }, product) {
    try {
      const response = await ProductService.getProducts(product)
      console.log(response.products)
  
      commit('SET_PRODUCT', response.products)
    } catch (error) {
      console.log(error)
    }
  },
  async fetchProductByCategory({ commit }, categoryId) {
    try {
      const response = await ProductService.getProductbycategory(categoryId);
      commit('SET_PRODUCT', response.products);
    } catch (error) {
      console.log(error);
    }
  },


  async fetchProductDetail({commit},productid){
    try {
      const response = await ProductService.getProductById(productid)
       const product = response.mess
       console.log(product);
      commit('SET_PRODUCT_BY_ID', product)
    } catch (error) {
      console.log(error,'sdh')
      throw new error
    }
  },
  async fetchFeaturedProducts({ commit, product }) {
    try {
      const response = await ProductService.getProducts(product)
      const sortedFeaturedProducts = response.products
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 10)

      commit('SET_FEATURED_PRODUCT', sortedFeaturedProducts)
    } catch (error) {
      throw new Error(error)
    }
  },
  async recommendProduct({commit},product){
    try {
      const response = await ProductService.recommendProduct(product)
          const data = response.products
         console.log( 'fuck:', data);
         commit('SET_RECOMMENDED_PRODUCTS',data)
    } catch (error) {
      console.log(error);
    }
  },
  async postrating({commit},product){
    try {
      const response = await ProductService.updateRatingProduct(product)
          const ratings = response.updatedProduct
         console.log(ratings);
         commit('SET_RATING',ratings)
         return ratings
    } catch (error) {
      console.log(error);
    }
  },
  async createProduct({ commit }, product) { // Changed here
    try {
      const response = await ProductService.createProduct(product);
      const createdProduct = response.createProduct; // Changed here
      console.log(createdProduct);
      commit('SET_AN_PRODUCT', createdProduct);
      return createdProduct;
    } catch (error) {
      console.log(error);
    }
  },
  async deleteProduct({ commit },pid) {
    commit('SET_LOADING', true);
    try {
      const response = await ProductService.deleteProductById(pid);
      const deleteAnProduct = response.mess
      console.log(deleteAnProduct);
      commit('SET_AN_PRODUCT', deleteAnProduct);
      commit('SET_ERROR', null);
      return deleteAnProduct;
    } catch (error) {
     console.log(error);
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async updateproduct({ commit },{pid,data}) {
    commit('SET_LOADING', true);
    try {
      const response = await ProductService.updateProduct({pid,data});
      const updateAnProduct = response.product
      // console.log(updateAnProduct);
      console.log(typeof updateAnProduct)
      commit('SET_AN_PRODUCT', updateAnProduct);
      commit('SET_ERROR', null);
      return updateAnProduct;
    } catch (error) {
     console.log(error);
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async uploadimageproduct({ commit },{pid,data}) {
    commit('SET_LOADING', true);
    try {
      const response = await ProductService.uploadImage({pid,data});
      const updateImage = response.updateProduct
      console.log(updateImage);
      commit('SET_AN_PRODUCT', updateImage);
      commit('SET_ERROR', null);
      return updateImage;
    } catch (error) {
     console.log(error);
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async searchname({commit},name){
          try {
            const response = await ProductService.searchProductByName(name)
             const product= response.products
             console.log(product);
            commit('SEARCH_PRODUCT',product)
          
          } catch (error) {
            console.log(error)
          }
  },

  
 
  // khi mở modal thì nó resetcount
  openProductModal({ commit, dispatch }, product) {
    dispatch('resetCount')
    commit('OPEN_MODAL', product)
  },
  resetCount({ commit }) {
    commit('RESET_COUNT')
  },

  closeProductModal({ commit }) {
    commit('CLOSE_MODAL')
  },

  incrementCount({ commit, state }) {
    if (state.countProducts < state.selectedProduct.quantity) {
      commit('INCREMENT_COUNT')
    }
  },
  decrementCount({ commit }) {
    commit('DECREMENT_COUNT')
  }
}

  
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
