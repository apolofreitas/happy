import Orphanage from './orphanages.model';
import * as imagesView from '../images/images.view';

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
    images: imagesView.renderMany(orphanage.images),
  };
}

export function renderMany(orphanages: Orphanage[]) {
  return orphanages.map(orphanage => {
    return render(orphanage);
  });
}
