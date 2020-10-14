import { getRepository } from 'typeorm';

import Image from './images.model';

export function getImagesRepository() {
  const imagesRepository = getRepository(Image);
  return imagesRepository;
}
