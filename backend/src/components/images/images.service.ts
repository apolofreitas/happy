import Image from './images.model';

export async function create(imageFields: Omit<Image, 'id'>): Promise<Image> {
  const createdImage = await Image.create(imageFields).save();

  return createdImage;
}

export async function index(): Promise<Image[]> {
  const images = await Image.find();

  return images;
}

export async function show(id: number): Promise<Image> {
  const image = await Image.findOneOrFail(id);

  return image;
}
