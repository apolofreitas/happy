import Images from './images.model';

export function render(image: Images) {
  return {
    id: image.id,
    url: `http://localhost:3333/uploads/${image.path}`,
  };
}

export function renderMany(images: Images[]) {
  return images.map(image => render(image));
}
