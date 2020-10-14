import { Request, Response } from 'express';
import * as Yup from 'yup';

import * as orphanageService from './orphanages.service';

export async function index(_request: Request, response: Response) {
  const allOrphanages = await orphanageService.index();
  return response.json(allOrphanages);
}

export async function show(request: Request, response: Response) {
  try {
    const { id } = request.params;
    const allOrphanages = await orphanageService.show(parseInt(id));
    return response.json(allOrphanages);
  } catch {
    return response.status(404).json({ error: 'Orphanage not found.' });
  }
}

export async function create(request: Request, response: Response) {
  const {
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
  } = request.body;

  const images = (request.files as Express.Multer.File[]).map(image => {
    return { path: image.filename };
  });

  const orphanageFields = {
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
    images,
  };

  const orphanageFieldsSchema = Yup.object().shape({
    name: Yup.string().required(),
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
    about: Yup.string().required().max(300),
    instructions: Yup.string().required(),
    opening_hours: Yup.string().required(),
    open_on_weekends: Yup.boolean().required(),
    images: Yup.array(
      Yup.object().shape({ path: Yup.string().required() }),
    ).required(),
  });

  await orphanageFieldsSchema.validate(orphanageFields, { abortEarly: false });

  const createdOrphanage = await orphanageService.create(orphanageFields);

  return response.status(201).json({ orphanage: createdOrphanage });
}
