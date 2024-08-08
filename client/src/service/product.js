import axios from "../helper/axios";


class ProductService {
  // Lấy tất cả sản phẩm
  async getProducts() {
    try {
      const response = await axios.get('/product');
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Cập nhật rating sản phẩm
  async updateRatingProduct(data) {
    try {
      const response = await axios.put('product/ratings', data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Cập nhật sản phẩm
  async updateProduct({pid,data}) {
    try {
      const response = await axios.put(`product/${pid}`,data);
      console.log(response);
      return response;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to update product');
    }
  }
  async createProduct(data) {
    try {
      const response = await axios.post(`product`,data,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }});
      console.log(response);
      return response;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to create product');
    }
  }
  
  async uploadImage({pid,data}) {
   try {
     const response = await axios.put(`/product/uploadimage/${pid}`,data,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }});
     console.log(response);
     return response;
   } catch (error) {
     throw new Error(error.response.data.message || 'Failed to update product');
   }
 }

  // Lấy sản phẩm theo ID
  async getProductById(IdProduct) {
    try {
      const response = await axios.get(`/product/${IdProduct}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  // lấy sản phẩm theo id category
  async getProductbycategory(categoryid) {
    try {
      const response = await axios.get(`/product/?category=${categoryid}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async recommendProduct(product){
    try {
      const response = await axios.post(`/product/recommend/${product}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  
  async deleteProductById(IdProduct) {
    try {
      const response = await axios.delete(`/product/${IdProduct}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  // Tìm kiếm sản phẩm theo tên
  async searchProductByName(name) {
    try {
      const response = await axios.get(`/product/?name=${name}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ProductService();