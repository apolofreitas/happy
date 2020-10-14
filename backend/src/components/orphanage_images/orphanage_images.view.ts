import OrphanageImage from './orphanage_images.model';

export function render(orphanageImage: OrphanageImage) {
  return {
    id: orphanageImage.id,
    url: `http://localhost:3333/uploads/${orphanageImage.path}`,
  };
}

export function renderMany(orphanageImages: OrphanageImage[]) {
  return orphanageImages.map(orphanageImage => render(orphanageImage));
}
