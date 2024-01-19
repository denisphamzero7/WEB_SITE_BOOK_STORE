import axios from "axios";


class UserService {
    async getalluser (data){
        try {
            const response = await axios.get('/user', data)
              return response
        } catch (error) {
            console.log(error);
        }
    }
    async getcurrentuser (data){
        try {
            const response = await axios.get('/current',data)
            console.log(response);
            return response
        } catch (error) {
            console.log(error);
        }
    }
}
export default new UserService