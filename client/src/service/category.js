import  axios  from '../helper/axios'

class CategoryProductService{
    async getcategory(){
        try {
            const response = await axios.get("productcategory")
            console.log(response)
            return response
        } catch (error) {
            throw error
        }
    }
}
export default new CategoryProductService();