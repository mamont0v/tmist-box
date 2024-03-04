import express from 'express';
import {
    getAsset,
    updateAsset,
    createAsset,
    deleteAsset
} from '../controllers/it-assets.controller.js';

// new express.Router()
const router = express.Router();

//Example route (where) and .get/.delete methods
//router.route('/path').get((req,res)=> {
// })


//REST API 
//@ GET
router.get('/', getAsset);

//@ GET by ID
// router.get('/:id', controller.getTest);

//was .put
//@ EDIT by ID
router.patch('/:id', updateAsset);

//@ CREATE new ID
router.post('/', createAsset);

//@ DELETE
router.delete('/:id', deleteAsset);

export default router;