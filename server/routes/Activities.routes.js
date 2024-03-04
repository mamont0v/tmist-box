import express from 'express';
import {
    getActivities,
    createActivities,
    deleteActivities,
    updateActivities
} from '../controllers/activities.controller.js';


const router = new express.Router();

/*****************
** REST API ******
******************/
//@ GET ALL companies
router.get('/', getActivities);
//@ CREATE new companie
router.post('/', createActivities);
//@ DELETE by id companie
router.delete('/:id', deleteActivities);
//@ UPDATE by id companie
router.patch('/:id', updateActivities);

export default router;

