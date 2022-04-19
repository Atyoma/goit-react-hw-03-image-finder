import { Component } from 'react';
import s from './imageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class ImageGallery extends Component {
  state = {
    page: 1,
    pictureGallery: [],
    picture: null,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.picture !== this.props.picture) {
      this.setState({ status: 'panding', page: 1 });
      fetch(
        `https://pixabay.com/api/?q=${this.props.picture}&page=${this.state.page}&key=25171903-77720667295a00af61497589c&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          Promise.reject(new Error('Something went wrong!!!'));
        })
        .then(picture =>
          this.setState({
            picture,
            pictureGallery: [...picture.hits],
            status: 'resolved',
          })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    if (prevState.page !== this.state.page) {
      this.setState({ status: 'panding' });
      fetch(
        `https://pixabay.com/api/?q=${this.props.picture}&page=${this.state.page}&key=25171903-77720667295a00af61497589c&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          Promise.reject(new Error('Something went wrong!!!'));
        })
        .then(pictureGallery =>
          this.setState(prev => ({
            pictureGallery: [...prev.pictureGallery, ...pictureGallery.hits],
            status: 'resolved',
          }))
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  loadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
    console.log(this.state.page);
  };

  render() {
    const { status, pictureGallery } = this.state;
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
        <>
          <ul className={s.imageGallery}>
            {pictureGallery.map(hit => {
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
          <Button loadMore={this.loadMore} />
        </>
      );
    }
  }
}
