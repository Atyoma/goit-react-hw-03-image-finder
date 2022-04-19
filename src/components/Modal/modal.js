import { Component } from 'react';
import s from './modal.module.css';
import propTypes from 'prop-types';

export default class Modal extends Component {
  // Esc close Modal
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  //======================

  //Bacdrop close Modal

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    return (
      <div className={s.overlay} onClick={this.handleBackdropClick}>
        <div className={s.modal}>
          <img src={this.props.modalImage} alt="Large_Image" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: propTypes.func,
  modalImage: propTypes.string,
};
