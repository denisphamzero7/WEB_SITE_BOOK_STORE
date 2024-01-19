const mongoose = require('mongoose')
const dbConnect = async () => {
    try {
        const mongodbUri = process.env.MONGODB_URI;
        console.log(typeof process.env.MONGODB_URI, process.env.MONGODB_URI);
        await mongoose.connect(mongodbUri);
        useUnifiedTopology = true;
        useNewUrlParser = true;
        console.log('connect to mongodb: ', mongodbUri);
    } catch (error) {
        console.log('db connect error');
        throw new Error(error);
    }
}
module.exports = dbConnect;