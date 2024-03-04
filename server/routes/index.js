// В файле mainRouter.js
import express from 'express';
import usersRouter from './Users.routes.js';
import clientsRouter from './Clients.routes.js';
import personnelRouter from './Personnel.routes.js';
import activitiesRouter from './Activities.routes.js';
import itAssetsRouter from './ItAssets.routes.js';
import companyRouter from './Company.routes.js';
import equipmentsRouter from './Equipments.routes.js';

const mainRouter = express.Router();

mainRouter.use('/clients', clientsRouter);
mainRouter.use('/users', usersRouter);
mainRouter.use('/personnel', personnelRouter);
mainRouter.use('/itAssets', itAssetsRouter);
mainRouter.use('/activities', activitiesRouter);
mainRouter.use('/company', companyRouter);
mainRouter.use('/equipments', equipmentsRouter);


export default mainRouter;