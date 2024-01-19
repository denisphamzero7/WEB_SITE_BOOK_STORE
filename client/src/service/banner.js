import  axios  from '../helper/axios'

class BannerService{
    async getbanners(){
        try {
            const response = await axios.get("/banner/")
            console.log(response)
            return response
        } catch (error) {
            throw error
        }
    }
}
export default new BannerService();