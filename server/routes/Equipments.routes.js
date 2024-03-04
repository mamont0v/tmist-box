import express from 'express';
import {
    getEquipments,
    createEquipments,
    deleteEquipments,
    updateEquipments
} from '../controllers/equipments.controller.js';

const router = new express.Router();


/*****************
** REST API ******
******************/


//@ GET ALL companies
router.get('/', getEquipments);
//@ CREATE new companie
router.post('/', createEquipments);
//@ DELETE by id companie
router.delete('/:id', deleteEquipments);
//@ UPDATE by id companie
router.patch('/:id', updateEquipments);

// router.post('/personnel/', controller.addToPersonnel);

export default router;