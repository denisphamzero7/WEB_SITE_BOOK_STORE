import  axios  from '../helper/axios'

class BookCategoryService{
    async getbookcategory(){
        try {
            const response = await axios.get("bookcategory")
            console.log(response)
            return response
        } catch (error) {
            throw error
        }
    }
    
}
export default new BookCategoryService();