
import { Component } from 'react';
import s from './app.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
// import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
  // import { ToastContainer} from 'react-toastify';
export default class App extends Component {
  state = {
    picture: '',
    loading: false,
  };

  handleFormSubmit = picture => {
    this.setState({picture})
  }
  render() {
    return (
      <div className ={s.app}>
        
        
        <Searchbar onSubmit={this.handleFormSubmit} />
         <ImageGallery picture={this.state.picture} />
        {/* <ToastContainer autoClose={3000} /> */}
      </div>
    );
  }
}