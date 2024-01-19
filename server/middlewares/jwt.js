const jwt = require('jsonwebtoken');
const generateAcessToken = (uid,role)=>jwt.sign({id:uid,role},process.env.JWT_SECRET,{expiresIn:'2d'})
const generateRefreshToken = (uid)=>jwt.sign({id:uid},process.env.JWT_SECRET,{expiresIn:'7d'})

module.exports = {
    generateAcessToken,
    generateRefreshToken
}