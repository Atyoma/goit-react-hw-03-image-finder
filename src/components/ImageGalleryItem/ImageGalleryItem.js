import React from 'react';
import s from './imageGalleryItem.module.css';
// import propTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  return (
    <li className={s.imageGalleryItem}>
      <img
        src={webformatURL}
        data={largeImageURL}
        alt={tags}
        className={s.imageGalleryItemImage}
      />
    </li>
  );
};

export default ImageGalleryItem;
