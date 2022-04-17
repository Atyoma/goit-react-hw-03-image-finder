import { Component } from 'react';
import s from './imageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';

export default class ImageGallery extends Component {
  state = {
    picture: null,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.picture !== this.props.picture) {
      this.setState({ status: 'panding' });
      fetch(
        `https://pixabay.com/api/?q=${this.props.picture}&page=1&key=25171903-77720667295a00af61497589c&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(picture => this.setState({ picture, status: 'resolved' }));
    }
  }

  render() {
    const { picture, status } = this.state;
    if (status === 'idle') {
      return <p className={s.message}>Please enter your request</p>;
    }
    if (status === 'panding') {
      return <Loader />;
    }
    if (status === 'rejected') {
      return <Loader />;
    }
    if (status === 'resolved') {
      return (
        <ul className={s.imageGallery}>
          {picture.hits.map(hit => {
            return (
              <ImageGalleryItem
                key={hit.id}
                tags={hit.tags}
                largeImageURL={hit.largeImageURL}
                webformatURL={hit.webformatURL}
              />
            );
          })}
        </ul>
      );
    }
  }
}
