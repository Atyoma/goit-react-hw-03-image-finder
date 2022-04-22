import { Component } from 'react';
import s from './app.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/modal';
import Button from './Button/button';
import api from '../Service/api-service'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default class App extends Component {
  state = {
    status: 'idle',
    page: 1,
    pictureGallery: [],
    picture: null,
    error: null,
    modal: null,
    showModal: false,
    totalHits: null,
    per_page:12
  };

  handleFormSubmit = picture => {
    this.setState({ picture });
  };

  componentDidUpdate(prevProps, prevState) {
   
    const { picture, page, per_page } = this.state;

    if (prevState.picture !== this.state.picture) {
      this.setState({
        status: 'panding',
        page: 1,
        pictureGallery: [],
      });
      api.fetchPicture( picture, page, per_page) 
        .then(picture =>
          this.setState({
            pictureGallery: [...picture.hits],
            status: 'resolved',
            totalHits: picture.totalHits,
          })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    if (prevState.page !== page) {
      this.setState({ status: 'panding' });
      api.fetchPicture( picture, page, per_page) 
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

  openModal = modalImage => {
    this.setState(() => ({
      showModal: true,
      modal: modalImage,
    }));
  };

  closeModal = () => {
    this.setState(() => ({
      showModal: false,
    }));
  };

  render() {
    const { status, page, showModal, totalHits, pictureGallery, per_page } = this.state;
    const balance = totalHits - page * per_page;
    // console.log(balance)
    return (
      <div className={s.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          pictureGallery={pictureGallery}
          status={status}
          showModal={showModal}
          openModal={this.openModal}
        />
        {balance > 0 && <Button loadMore={this.loadMore} />}
        {showModal && (
          <Modal
            onClose={this.closeModal}
            modalImage={this.state.modal}
          ></Modal>
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}


