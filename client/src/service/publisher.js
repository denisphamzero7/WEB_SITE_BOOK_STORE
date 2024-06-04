import  axios  from '../helper/axios'

class PublisherService{
    async getPublisher(){
        try {
            const response = await axios.get("/publisher/")
            console.log(response)
            return response
        } catch (error) {
            throw error
        }
    }
}
export default new PublisherService();