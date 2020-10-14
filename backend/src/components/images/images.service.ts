import Image from './images.model';
import { getImagesRepository } from './images.repository';

export async function create(imageFields: Omit<Image, 'id'>): Promise<Image> {
  const imagesRepository = getImagesRepository();

  const createdImage = imagesRepository.create(imageFields);

  await imagesRepository.save(createdImage);

  return createdImage;
}

export async function index(): Promise<Image[]> {
  const imagesRepository = getImagesRepository();

  const images = await imagesRepository.find();

  return images;
}

export async function show(id: number): Promise<Image> {
  const imagesRepository = getImagesRepository();

  const image = await imagesRepository.findOneOrFail(id);

  return image;
}
