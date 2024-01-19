
const Author = require('../models/author');

const asyncHandler = require('express-async-handler');

// create a new author
const createAuthor = asyncHandler(async (req, res) => {
  const { _id, name } = req.body;

  const existingAuthor = await Author.findOne({ $or: [{ _id }, { name }] });

  if (existingAuthor) {
    let error = existingAuthor._id === _id ? 'Author ID already exists' : 'Author name already exists';
    return res.status(400).json({
      success: false,
      error,
    });
  }

  const author = await Author.create(req.body);
  res.status(201).json({
    success: true,
    data: author,
  });
});
//get all authors

const getAllAuthors = asyncHandler(async (req, res) => {
  const author = await Author.find().populate("listProduct");
  console.log("getAuth", author);
  res.status(200).json({
    success: true,
    data: author,
  });
});
// get an author 
const getAnAuthor = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id).populate("listProduct")
  res.status(200).json({
    success: true,
    data: author,
  })
});
// update an author 
const updateAnAuthor = asyncHandler(async (req, res) => {
  const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json({
    success: true ? true : false,
    data: author,
    mess: author ? 'Updated successfully' : 'updated failed'
  })
});
// deleteAnAuthor

const deleteAnAuthor = asyncHandler(async (req, res) => {
  const { id } = req.params
  const author = await Author.findByIdAndDelete(id, req.body, { new: true });
  res.status(200).json({
    success: true ? true : false,
    data: author,
    mess: author ? 'Deleted successfully' : 'deleted failed'
  })
});
//upload image
const uploadImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log('cc', id);
  if (!id) throw new Error('Missing product ID')
  if (!req.file) throw new Error('missing inputs');
  const response = await Author.findByIdAndUpdate(id,
    { $push: { image: req.file.path } },
    { new: true });
  if (!response) throw new Error('update failed');
  return res.status(200).json({
    status: true,
    updateAuthor: response
  });
});
module.exports = {
  createAuthor,
  getAllAuthors,
  getAnAuthor,
  updateAnAuthor,
  deleteAnAuthor,
  uploadImage
}