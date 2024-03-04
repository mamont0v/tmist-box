import mongoose from 'mongoose';
import db from '../models/index.js';


// @FETCH all Customers
export const getActivities = async (req, res) => {
  try {
    const data = await db.Activities.find({})
    res.json(data)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
};


// @POST a Customer
export const createActivities = async (req, res) => {
  const data = new db.Activities(req.body)
  try {
    await data.save()
    res.status(201).json(data)
  } catch (error) {
    res.status(409).json(error);
  }
};


// UPDATE a Customer
export const updateActivities = async (req, res) => {
  try {
    const { id: _id } = req.params
    const data = req.body
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Компания не найдена с таким ID')
    const updateData = await db.Activities.findByIdAndUpdate(_id, { ...data, _id }, { new: true })
    res.json({ updateData, message: 'Компания удалена успешно из БД!' })
  } catch (error) {
    res.json(error)
  }
};


// @DELETE
export const deleteActivities = async (req, res) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('Компания не найдена')
    await db.Activities.findByIdAndRemove(id)
    res.json({ message: 'Данные о компании изменены успешно!' })
  } catch (err) {
    res.json(error)
  }
};


// @ADD to Personnel model
// exports.addToPersonnel = async (req, res) => {
//   try {
//     const person = await db.Personnel.find()
//     person.companie.push(req.body);
//     person.save();

//   } catch (error) {
//     res.json(error)
//   }
// }

