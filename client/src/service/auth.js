import  axios  from '../helper/axios'
class AuthService {
  async login(email,password) {
    try {
      const response = await axios.post('/user/login', {email,password})
      // Extract access token and user data from the response
      const { accessToken, userData } = response;
       // Save the access token and user data to local storage
       localStorage.setItem('accessToken', accessToken);
       localStorage.setItem('userData', JSON.stringify(userData));
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Rethrow the error for the calling code to handle
    }
  }
  async register(data) {
    try {
      const response = await axios.post('/user/register', data)
      return response
    } catch (error) {
      console.log(error);
    }
  }
  async refeshtoken(data) {
    const response = await axios.post('user/refreshtoken/', data)
    return response
  }

  
}
export default new AuthService();