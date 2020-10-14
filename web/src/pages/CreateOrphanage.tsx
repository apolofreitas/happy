import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';

import { FiPlus, FiX } from 'react-icons/fi';

import '../styles/pages/create-orphanage.scss';

import mapIcon from '../utils/mapIcon';
import Sidebar from '../components/Sidebar';
import { LeafletMouseEvent } from 'leaflet';
import api from '../services/api';
import { useHistory } from 'react-router-dom';

export default function CreateOrphanage() {
  const history = useHistory();

  const [position, setPosition] = useState<{
    latitude?: number;
    longitude?: number;
  }>({});
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  const [openOnWeekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [imagesPreviewURLs, setImagesPreviewURLs] = useState<string[]>([]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = new FormData();

    const { latitude, longitude } = position;

    if (!latitude || !longitude) return;

    data.append('name', name);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('opening_hours', openingHours);
    data.append('open_on_weekends', String(openOnWeekends));

    images.forEach(image => data.append('images', image));

    await api.post('orphanages', data);

    alert('Cadastro realizado com sucesso!');

    history.push('/app');
  }

  function handleSelectedImages(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    if (!files) return;

    const selectedImages = [...images, ...Array.from(files)];

    setImages(selectedImages);

    const previewSelectedImagesURLs: string[] = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setImagesPreviewURLs(previewSelectedImagesURLs);
  }

  return (
    <div id="create-orphanage-page">
      <Sidebar />

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-3.0446598, -60.037144]}
              zoom={12}
              style={{ width: '100%', height: 280 }}
              onclick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/apolofreitas/ckg73f5lf0egg19mbul2v46md/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              {position.latitude && position.longitude && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="about"
                maxLength={300}
                value={about}
                onChange={e => setAbout(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {imagesPreviewURLs.map((ImagePreviewURL, index) => {
                  return (
                    <div
                      className="image-preview-url"
                      key={`${ImagePreviewURL}-${index}`}
                    >
                      <div className="image">
                        <div
                          className="delete-image"
                          onClick={() => {
                            URL.revokeObjectURL(imagesPreviewURLs[index]);
                            setImagesPreviewURLs([
                              ...imagesPreviewURLs.filter(
                                (_, i) => index !== i,
                              ),
                            ]);
                            setImages([...images.splice(index, 1)]);
                          }}
                        >
                          <FiX size={24} color="#FF669D" />
                        </div>
                        <img src={ImagePreviewURL} alt={name} />
                      </div>
                    </div>
                  );
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
                <input
                  accept="image/*"
                  multiple
                  onChange={handleSelectedImages}
                  type="file"
                  id="image[]"
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                value={openingHours}
                onChange={e => setOpeningHours(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={openOnWeekends ? 'active' : ''}
                  onClick={() => {
                    setOpenOnWeekends(true);
                  }}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!openOnWeekends ? 'active' : ''}
                  onClick={() => {
                    setOpenOnWeekends(false);
                  }}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
