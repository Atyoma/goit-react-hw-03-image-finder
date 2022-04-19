import { Component } from 'react';
import s from './imageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/button';
import Modal from 'components/Modal/modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import propTypes from 'prop-types';

export default class ImageGallery extends Component {
  state = {
    page: 1,
    pictureGallery: [],
    picture: null,
    error: null,
    status: 'idle',
    modal: null,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.picture !== this.props.picture) {
      this.setState({
        status: 'panding',
        page: 1,
        pictureGallery: [],
      });
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
  };

  toggleModal = modalImage => {
    // console.log(e);
    this.setState(state => ({
      showModal: !state.showModal,
      modal: modalImage,
    }));
  };

  render() {
    const { status, pictureGallery, picture, page, showModal } = this.state;
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
      // прячем кнопку
      const balance = picture.totalHits - page * 12;
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
                  pictureGallery={pictureGallery}
                  onClick={this.toggleModal}
                />
              );
            })}
          </ul>
          {balance > 0 && <Button loadMore={this.loadMore} />}
          {showModal && (
            <Modal
              onClose={this.toggleModal}
              modalImage={this.state.modal}
            ></Modal>
          )}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  page: propTypes.number,
  picture: propTypes.string,
  pictureGallery: propTypes.array,
};
