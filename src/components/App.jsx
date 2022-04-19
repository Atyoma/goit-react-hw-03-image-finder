
import { Component } from 'react';
import s from './app.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
// import Modal from './Modal/modal';
// import Button from './Button/Button';

import { ToastContainer } from 'react-toastify';
   import 'react-toastify/dist/ReactToastify.css';
export default class App extends Component {
  state = {
    picture: '',
    status: 'idle',
    page: 1,
    pictureGallery: [],
  };

  handleFormSubmit = picture => {
    this.setState({ picture })
    
  }

  

  render() {
    // console.log(this.state.picture.length)
    return (
      <div className ={s.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery picture={this.state.picture} page={this.state.page} pictureGallery={this.state.pictureGallery} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}