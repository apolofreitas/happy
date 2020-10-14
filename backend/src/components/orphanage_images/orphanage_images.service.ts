import { DeepPartial } from 'typeorm';
import OrphanageImage from './orphanage_images.model';

export async function create(
  orphanageImageFields: DeepPartial<OrphanageImage>,
): Promise<OrphanageImage> {
  const createdOrphanageImage = await OrphanageImage.create(
    orphanageImageFields,
  ).save();

  return createdOrphanageImage;
}

export async function index(): Promise<OrphanageImage[]> {
  const orphanageImages = await OrphanageImage.find();

  return orphanageImages;
}

export async function show(id: number): Promise<OrphanageImage> {
  const orphanageImage = await OrphanageImage.findOneOrFail(id);

  return orphanageImage;
}
