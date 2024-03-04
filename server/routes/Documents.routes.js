import express from 'express';
import {
    fetchCommissionOrderPdf,
    createCommissionOrderPdf
} from '../controllers/Documents.controller.js';


const router = new express.Router();


/*****************
** REST API ******
******************/


//@ GET /create-pdf
router.get('/workflow/categorization-commission', fetchCommissionOrderPdf);

//@ CREATE /fetch-pdf
router.post('/workflow/categorization-commission', createCommissionOrderPdf);



export default router;