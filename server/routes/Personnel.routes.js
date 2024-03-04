import { Router } from 'express';
import * as controller from '../controllers/personnel.controller.js';


const router = Router();

//Example route (where) and .get/.delete methods
//router.route('/path').get((req,res)=> {
// })


//REST API 

//@ GET
// router.get('/personnel/', controller.showPersonnel);

//@ GET
router.get('/', controller.getPersonnel);

//@ GET by ID
// router.get('/:id', controller.getTest);

//was .put
//@ EDIT by ID
router.patch('/:id', controller.updatePersonnel);

//@ CREATE new ID
router.post('/', controller.createPersonnel);

//@ DELETE
router.delete('/:id', controller.deletePersonnel);



export default router;