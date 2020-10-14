import Orphanage from './orphanages.model';
import * as orphanageImagesView from '../orphanage_images/orphanage_images.view';

export function render(orphanage: Orphanage) {
  return {
    id: orphanage.id,
    name: orphanage.name,
    latitude: orphanage.latitude,
    longitude: orphanage.longitude,
    about: orphanage.about,
    instructions: orphanage.instructions,
    opening_hours: orphanage.opening_hours,
    open_on_weekends: orphanage.open_on_weekends,
    images: orphanageImagesView.renderMany(orphanage.images),
  };
}

export function renderMany(orphanages: Orphanage[]) {
  return orphanages.map(orphanage => {
    return render(orphanage);
  });
}
