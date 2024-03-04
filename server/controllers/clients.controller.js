import mongoose from 'mongoose';
import model from '../models/index.js';
import bcrypt from 'bcryptjs';

export const getClients = async (req, res, next) => {
    try {
        const FETCH_DB_COLLECTIONS = await model.Clients.find()
        res.json(FETCH_DB_COLLECTIONS)

    } catch (err) {
        next(err)
    }
};
