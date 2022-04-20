import React from 'react';
import s from './imageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import propTypes from 'prop-types';

const ImageGallery = ({ pictureGallery, status, openModal }) => {
  if (status === 'idle') {
    return null;
  }
  if (status === 'panding') {
    return <Loader />;
  }
  if (status === 'rejected') {
    return toast.error('Something went wrong!!!');
  }
  if (status === 'resolved') {
    return (
      <ul className={s.imageGallery}>
        {pictureGallery.map(hit => {
          return (
            <ImageGalleryItem
              key={hit.id}
              tags={hit.tags}
              largeImageURL={hit.largeImageURL}
              webformatURL={hit.webformatURL}
              pictureGallery={pictureGallery}
              onClick={openModal}
            />
          );
        })}
      </ul>
    );
  }
};

ImageGallery.propTypes = {
  status: propTypes.string,
  openModal: propTypes.func,
  pictureGallery: propTypes.array,
};

export default ImageGallery;
