import React from 'react';
import s from './imageGalleryItem.module.css';
// import propTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  return (
    <li className={s.galleryItem}>
      <img
        src={webformatURL}
        data-img={largeImageURL}
        alt={tags}
        className={s.galleryImg}
        width={500}
      />
    </li>
  );
};

export default ImageGalleryItem;
