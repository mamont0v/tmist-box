import express from 'express';
import usersRoute from '../../routes/users.route.js';
import clientsRoute from '../../routes/clients.route.js';
import personnelRouter from '../../routes/Personnel.routes.js';
import activitiesRouter from '../../routes/Activities.routes.js';
import itAssetsRouter from '../../routes/ItAssets.routes.js';
import companyRouter from '../../routes/Company.routes.js';
import equipmentsRouter from '../../routes/Equipments.routes.js';


const app = express();
app.use('/users', usersRoute);
app.use('/clients', clientsRoute);
app.use('/personnel', personnelRouter);
app.use('/itAssets', itAssetsRouter);
app.use('/activities', activitiesRouter);
app.use('/company', companyRouter);
app.use('/equipments', equipmentsRouter);

export default app;





