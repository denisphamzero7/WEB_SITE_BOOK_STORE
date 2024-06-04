const Banner = require('../models/banner')
const asyncHandler = require('express-async-handler')
const createBanner = asyncHandler(async (req, res) => {
    const {name } = req.body
    
 
    if(!image || !name) throw new Error('missing input')
    const banner = await Banner.create({
        images: image,
        name
    })

    return res.status(200).json({
         status: banner?true:false,
         data: banner
    })
})
// get banner

const getBanner = asyncHandler(async (req, res) => {
   
    
      const banners = await Banner.find()
    return res.status(200).json({
        status: banners?true:false,
        data: banners
    })
}) 
// delete banner
const deleteBanner = asyncHandler(async (req, res) => {
    const {id} = req.params
    if(!id) throw new Error ("Invalid banner")
    const response = await Banner.findByIdAndDelete(id,req.body);
    return res.status(200).json({
        success : true?true:false,
        data : response?'delete success':'delete error'
    })
});
//test api
const testapi = asyncHandler(async (req, res) => {
    const name = req.body.name;
    const imagePaths = req.files.map(file => file.path);

    // Kiểm tra xem banner có tồn tại không
    const existingBanner = await Banner.findOne({ name });

    if (existingBanner) {
        // Nếu banner tồn tại, thêm đường dẫn mới vào mảng images
        existingBanner.images = [...existingBanner.images, ...imagePaths];
        await existingBanner.save();

        res.json({
            success: true,
            data: existingBanner,
        });
    } else {
        // Nếu banner chưa tồn tại, tạo mới banner
        const newBanner = new Banner({
            name,
            images: imagePaths,
        });

        const createdBanner = await Banner.create(newBanner);

        res.json({
            success: true,
            data: createdBanner,
        });
    }
})
module.exports ={
    createBanner,
    getBanner,
    deleteBanner,testapi
}