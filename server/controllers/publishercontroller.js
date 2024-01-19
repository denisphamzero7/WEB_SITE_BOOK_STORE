const Publisher = require('../models/publisher');
const asyncHandler = require('express-async-handler');

// create a publisher
const createpublisher = asyncHandler(async (req, res) => {
    const {title}= req.body;
    if (!title) throw new Error('missing inputsđ');
    const response = await Publisher.create(req.body);

    res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'not created'
    });
});

// get the publisher
const getpublisher = asyncHandler(async (req, res) => {
    const response = await Publisher.find();
    res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'not found publisher ff'
    });
});
// get an publisher
const getanpublisher = asyncHandler(async (req, res) => {
    const { plid } = req.params;

    const publisher = await Publisher.findById(plid);
  
    if (!publisher) {
      return res.status(404).json({
        error: "Publisher not found",
      });
    }
  
    res.status(200).json({
      data: publisher,
    }); 
});

// update the publisher
const updatedpublisher = asyncHandler(async (req, res) => {
    const { plid } = req.params;
    const response = await Publisher.findByIdAndUpdate(plid, req.body, { new: true });
    res.status(200).json({
        success: response ? true : false,
        updatedata: response ? response : 'can not update publisher'
    });
});

// delete the publisher
const deletepublisher = asyncHandler(async (req, res) => {
    const { plid } = req.params;
    const response = await Publisher.findByIdAndDelete(plid);
    res.status(200).json({
        success: response ? true : false,
        deletedata: response ? response : 'can not update publisher'
    });
});

module.exports = {
    createpublisher,
    getpublisher,
    updatedpublisher,
    deletepublisher,
    getanpublisher
};