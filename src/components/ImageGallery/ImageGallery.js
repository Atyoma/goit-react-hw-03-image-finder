import { Component } from 'react';
import s from './imageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
export default class ImageGallery extends Component {
  state = {
    page: 1,
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
        .then(picture =>
          this.setState({
            picture,
            status: 'resolved',
          })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  loadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
    console.log(this.state.page);
  };

  render() {
    const { picture, status } = this.state;
    if (status === 'idle') {
      return null;
    }
    if (status === 'panding') {
      return <Loader />;
    }
    if (status === 'rejected') {
      return <h1>Something went wrong!!!</h1>;
    }
    if (status === 'resolved') {
      return (
        <>
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
          <Button loadMore={this.loadMore} />
        </>
      );
    }
  }
}
