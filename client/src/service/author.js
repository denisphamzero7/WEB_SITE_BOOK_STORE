import  axios  from '../helper/axios'

class AuthorService{
    async getAuthor(){
        try {
            const response = await axios.get("author/")
            console.log(response)
            return response
        } catch (error) {
            throw error
        }
    }
}
export default new AuthorService();