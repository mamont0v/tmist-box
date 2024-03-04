import mongoose from 'mongoose';
import ItAssets from '../models/it-assets.model.js';

// @FETCH all Customers
export const getAsset = async (req, res) => {
  try {
    const getAssets = await ItAssets.find()
    res.status(200).json(getAssets)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
  // ItAssets.find()
  //   .then(data => res.json(data))
  //   .catch(error => res.status(400).json('Error: ' + error))
};


// @POST a Customer
export const createAsset = async (req, res) => {
  const asset = req.body
  const newAsset = new ItAssets(asset)
  try {
    await newAsset.save()
    res.status(201).json(newAsset)
  } catch (error) {
    res.status(409).json(error);
  }

};


// // get a Customer by Id
// exports.getAsset = (req, res) => {
//   ItAssets.findById(req.params.id)
//     .then(data => res.json(data))
//     .catch(err => res.status(400).json('Error', err))
// };

// UPDATE a Customer
export const updateAsset = async (req, res) => {
  const { id: _id } = req.params
  const asset = req.body

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

  const updateAsset = await ItAssets.findByIdAndUpdate(_id, { ...asset, _id }, { new: true })
  res.json(updateAsset)
};

// DELETE a Customer
export const deleteAsset = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('Пользователя с таким Id найдено')

  await ItAssets.findByIdAndRemove(id)
  res.json({ message: 'Пользователь удален успешно!' })
};