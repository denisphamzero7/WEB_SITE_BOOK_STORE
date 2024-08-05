import  axios  from '../helper/axios'

class NewsService{
    async getnews(){
        try {
            const response = await axios.get("news")
            console.log(response)
            return response
        } catch (error) {
            throw error
        }
    }
    async getannews(newsId){
        try {
            const response = await axios.get(`news/one/${newsId}`)
            console.log(response)
            return response
        } catch (error) {
            throw error
        }
    }
    async deleteannews(newsId){
        try {
            const response = await axios.delete(`news/one/${newsId}`)
            console.log(response)
            return response
        } catch (error) {
            throw error
        }
    }
    async createnews(data){
        try {
            const response = await axios.post("news",data)
            console.log(response)
            return response
        } catch (error) {
            throw error
        }
    }
    async updatenews(idnews,data) {
        try {
            const response = await axios.put(`news/${idnews}`, data);
            console.log(response);
            return response;
        } catch (error) {
            throw error;
        }
    }
}
export default new NewsService();