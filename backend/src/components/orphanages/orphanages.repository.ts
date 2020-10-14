import { getRepository } from 'typeorm';

import Orphanage from './orphanages.model';

export function getOrphanagesRepository() {
  const orphanagesRepository = getRepository(Orphanage);
  return orphanagesRepository;
}
