import mongoose from 'mongoose';
import db from '../models/index.js';

// @FETCH all Customers
export const getCompany = async (req, res) => {
  try {
    const company = await db.Company.find({})
    res.json(company)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
};

// @POST a Customer
export const createCompany = async (req, res) => {
  const company = new db.Company(req.body)
  try {
    await company.save()
    res.status(201).json(company)
  } catch (error) {
    res.status(409).json('не могу создать компанию');
  }
};



// UPDATE a Customer
export const updateCompany = async (req, res) => {
  try {
    const { id: _id } = req.params
    const person = req.body
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Компания не найдена с таким ID')
    const updateCompanies = await db.Company.findByIdAndUpdate(_id, { ...person, _id }, { new: true })
    res.json({ updateCompanies, message: 'Компания удалена успешно из БД!' })
  } catch (error) {
    res.json(error)
  }
};

// @DELETE
export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('Компания не найдена')
    await db.Company.findByIdAndRemove(id)
    res.json({ message: 'Данные о компании изменены успешно!' })
  } catch (err) {
    res.json(error)
  }
};

// @ADD to Personnel model
export const addToPersonnel = async (req, res) => {
  try {
    const person = await db.Personnel.find()
    person.companie.push(req.body);
    person.save();

  } catch (error) {
    res.json(error)
  }
}