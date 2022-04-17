
import { Component } from 'react';
import s from './app.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

  // import { ToastContainer} from 'react-toastify';
export default class App extends Component {
  state = {
    picture: [],
    status: 'idle',
  };

  handleFormSubmit = picture => {
    this.setState({picture})
  }

  renderMore = picture => {
    this.setState(prevState => ({
      picture: [...prevState.picture, ...picture],
    }));
  };

  // renderNew = picture => {
  //   this.setState(() => ({
  //     picture: [...picture],
  //   }));
  // };

  render() {
    return (
      <div className ={s.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery picture={this.state.picture} />
         {this.state.picture.length > 0 && (
          <Button loadMore={this.renderMore} />
        )}
        {/* <ToastContainer autoClose={3000} /> */}
      </div>
    );
  }
}