import axios from "../helper/axios";

class OrderService{
    async order(data) {
        try {
          const response = await axios.post(`/order`, data);
          console.log(response);
          return response;
        } catch (error) {
          console.log(error);
          throw error; 
        }
      }
      async getuserorder() {
        try {
          const response = await axios.get(`/order/`);
          console.log(response);
          return response;
        } catch (error) {
          console.log(error);
          throw error; 
        }
      }
      async getAnorder(oid) {
        try {
          const response = await axios.get(`/order/${oid}`);
          console.log(response);
          return response;
        } catch (error) {
          console.log(error);
          throw error; 
        }
      }
      async getordersbyadmin() {
        try {
          const response = await axios.get(`order/admin`);
          console.log(response);
          return response;
        } catch (error) {
          console.log(error);
          throw error; 
        }
      }
      
      async updateOrderStatus(orderId,status) {
        try {
          const response = await axios.put(`/order/status/${orderId}`,{status});
          console.log(response);
          return response;
        } catch (error) {
          console.log(error);
          throw error; 
        }
      }
      async searchorderbystatus(data){
        try {
           const response = await axios.get(`/order?status=${data}`)
           return response
        } catch (error) {
           console.log(error);
        }
     }
}
export default new  OrderService();