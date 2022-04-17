import { Component } from 'react';
import s from './searchbar.module.css';
import { ImSearch } from 'react-icons/im';
import propTypes from 'prop-types';
// import { toast } from 'react-toastify';

export default class Searchbar extends Component {
  state = {
    pictureName: '',
  };

  handleNameChange = e => {
    this.setState({ pictureName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    // предотвращение отпраавки пустой строки
    if (this.state.pictureName.trim() === '') {
      alert('Please enter search name');
      return;
    }
    this.props.onSubmit(this.state.pictureName);
    this.setState({ pictureName: '' });
  };

  render() {
    return (
      <header className={s.searchBar}>
        <form onSubmit={this.handleSubmit} className={s.searchForm}>
          <button type="submit" className={s.searchFormButton}>
            <ImSearch />
            <span className={s.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.pictureName}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  pictureName: propTypes.func,
};
