import { DeepPartial } from 'typeorm';
import Orphanage from './orphanages.model';

import * as orphanageView from './orphanages.view';

export async function create(orphanageFields: DeepPartial<Orphanage>) {
  const createdOrphanage = await Orphanage.create(orphanageFields).save();

  return orphanageView.render(createdOrphanage);
}

export async function index() {
  const orphanages = await Orphanage.find({ relations: ['images'] });

  return orphanageView.renderMany(orphanages);
}

export async function show(id: number) {
  const orphanage = await Orphanage.findOneOrFail(id, {
    relations: ['images'],
  });

  return orphanageView.render(orphanage);
}
