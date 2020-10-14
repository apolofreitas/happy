import { DeepPartial } from 'typeorm';
import Orphanage from './orphanages.model';

import { getOrphanagesRepository } from './orphanages.repository';
import * as orphanageView from './orphanages.view';

export async function create(orphanageFields: DeepPartial<Orphanage>) {
  const orphanagesRepository = getOrphanagesRepository();

  const createdOrphanage = orphanagesRepository.create(orphanageFields);

  await orphanagesRepository.save(createdOrphanage);

  return orphanageView.render(createdOrphanage);
}

export async function index() {
  const orphanagesRepository = getOrphanagesRepository();

  const orphanages = await orphanagesRepository.find({ relations: ['images'] });

  return orphanageView.renderMany(orphanages);
}

export async function show(id: number) {
  const orphanagesRepository = getOrphanagesRepository();

  const orphanage = await orphanagesRepository.findOneOrFail(id, {
    relations: ['images'],
  });

  return orphanageView.render(orphanage);
}
