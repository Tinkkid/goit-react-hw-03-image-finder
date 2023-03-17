import { createPortal } from 'react-dom';
import { Component } from 'react';
import { Overlay, ModalView } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { src, tags } = this.props;
    return createPortal(
      <Overlay onClick={this.handleClick}>
        <ModalView>
          <img src={src} alt={tags} />
        </ModalView>
      </Overlay>,
      modalRoot
    );
  }
}
