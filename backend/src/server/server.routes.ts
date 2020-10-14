import express, { Router } from 'express';
import path from 'path';
import multer from 'multer';

import errorHandler from '../shared/errors/handler';
import * as orphanagesController from '../components/orphanages/orphanages.controller';

import uploadConfig from '../shared/config/upload';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', orphanagesController.index);
routes.get('/orphanages/:id', orphanagesController.show);
routes.post('/orphanages', upload.array('images'), orphanagesController.create);

routes.use(
  '/uploads',
  express.static(path.join(__dirname, '..', '..', 'uploads')),
);

routes.use(errorHandler);

export default routes;
