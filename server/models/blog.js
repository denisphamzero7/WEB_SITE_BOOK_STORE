const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var BlogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
        
    },
    category:{
        type:String,
        required:true,
    },
   numberViews:{
        type:Number,
        default:0,
    },
    
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    dislikes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    image:{
        type:String,
        default:'https://media.istockphoto.com/id/1252684502/vi/anh/blogger-chuy%C3%AAn-nghi%E1%BB%87p-l%C3%A0m-vi%E1%BB%87c-tr%C3%AAn-b%C3%A0i-%C4%91%C4%83ng-m%E1%BB%9Bi-c%E1%BB%A7a-m%C3%ACnh-cho-ph%C6%B0%C6%A1ng-ti%E1%BB%87n-truy%E1%BB%81n-th%C3%B4ng-x%C3%A3-h%E1%BB%99i-%E1%BB%9F.jpg?s=1024x1024&w=is&k=20&c=_iOphJYHfSaKgyPEPiDIN4-3HhTfqyX0S0bhPjrykzk=',
    },
    author:{
        type:String,
        default:'admin'
    }   
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

//Export the model
module.exports = mongoose.model('Blog', BlogSchema);