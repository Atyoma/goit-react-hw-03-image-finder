import React from 'react';
import s from './imageGalleryItem.module.css';
import propTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL, onClick }) => {
  return (
    <li className={s.imageGalleryItem} onClick={() => onClick(largeImageURL)}>
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

ImageGalleryItem.propTypes = {
  webformatURL: propTypes.string,
  largeImageURL: propTypes.string,
  tags: propTypes.string,
  onClick: propTypes.func,
};
