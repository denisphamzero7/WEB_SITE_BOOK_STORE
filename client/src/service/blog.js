import  axios  from '../helper/axios'

class BlogService{
    async getblogs(){
        try {
            const response = await axios.get("blog")
            console.log(response)
            return response
        } catch (error) {
            throw error
        }
    }
    async getanblogs(blogId){
        try {
            const response = await axios.get(`blog/one/${blogId}`)
            console.log(response)
            return response
        } catch (error) {
            throw error
        }
    }
    async deleteanblog(blogId){
        try {
            const response = await axios.delete(`blog/one/${blogId}`)
            console.log(response)
            return response
        } catch (error) {
            throw error
        }
    }
    async createblogs(data){
        try {
            const response = await axios.post("blog",data)
            console.log(response)
            return response
        } catch (error) {
            throw error
        }
    }
    async updateblogs(idblog,data) {
        try {
            const response = await axios.put(`blog/${idblog}`,data)
            console.log(response)
            return response
        } catch (error) {
            throw error
        }
    }
}
export default new BlogService();