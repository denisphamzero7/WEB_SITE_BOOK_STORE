import axios from "../helper/axios";



class UserService {
    async getalluser(data){
        try {
            const response = await axios.get('user', data)
              return response
        } catch (error) {
            console.log(error);
        }
    }
    
  async forgotpassword(email) {
    try {
      const response = await axios.get('user/forgotpassword', { params: { email } });
      return response;
    } catch (error) {
      console.error('Error:', error.response?.data?.message || error.message);
      throw error;
    }
  }
    async statistical(data){
      try {
          const response = await axios.get('user/statistical', data)
            return response
      } catch (error) {
          console.log(error);
      }
  }
    
    async getcurrentuser (data){
        try {
            const response = await axios.get('/user/current',data)
            console.log(response);
            return response
        } catch (error) {
            console.log(error);
        }
    }
    async getuserbyid (userId){
      try {
          const response = await axios.get(`user/${userId}`)
          console.log(response);
          return response
      } catch (error) {
          console.log(error);
      }
  }
    async updateuserbyadmin(userId,data){
      try {
          const response = await axios.put(`/user/${userId}`,data,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }})
          console.log(response);
          return response
      } catch (error) {
          console.log(error);
      }
  }

    async updatecurrentuser (data){
      try {
          const response = await axios.put('/user/current',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }})
          console.log(response);
          return response
      } catch (error) {
          console.log(error);
      }
  }
    async updatecart(data) {
        try {
          const response = await axios.put(`/user/cart/`, data);
          console.log(response);
          return response;
        } catch (error) {
          console.log(error);
          throw error; 
        }
      }
      async updateaddress(data) {
        try {
          const response = await axios.put(`/user/address`, data);
          console.log(response);
          return response;
        } catch (error) {
          console.log(error);
          throw error; 
        }
      }
      async removeproductincart(productId) {
        try {
          const response = await axios.delete(`/user/cart/${productId}`);
          console.log(response);
          return response;
        } catch (error) {
          console.log(error);
          throw error; 
        }
      }
      async removewishlist(productId) {
        try {
          const response = await axios.delete(`/user/wishlist/${productId}`);
          console.log(response);
          return response;
        } catch (error) {
          console.log(error);
          throw error; 
        }
      }
      async updatewishlist(productId) {
        try {
          const response = await axios.put(`/user/wishlist/${productId}`);
          console.log(response);
          return response;
        } catch (error) {
          console.log(error);
          throw error; 
        }
      }
    

}
export default new UserService