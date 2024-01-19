const allowedOrigins = require('./allowed_origins');

const corOptions = {
    origin:(origin, callback) =>{
        if(allowedOrigins.includes(origin)||!origin){
            callback(null, true);
        }else{
            callback(new Error('not allowed by Cords'));
        }
    }
}

module.exports = corOptions;