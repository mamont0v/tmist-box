import express from 'express';
import {
    getCompany,
    createCompany,
    deleteCompany,
    updateCompany,
    addToPersonnel
} from '../controllers/company.controller.js';

const router = new express.Router();


//@ GET ALL companies
router.get('/', getCompany);
//@ CREATE new companie
router.post('/', createCompany);
//@ DELETE by id companie
router.delete('/:id', deleteCompany);
//@ UPDATE by id companie
router.patch('/:id', updateCompany);

router.post('/personnel/', addToPersonnel);

export default router;