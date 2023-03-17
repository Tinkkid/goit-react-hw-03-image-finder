import { Component } from 'react';
import { Modal } from '../Modal/Modal';
import { GalleryItem, Image } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { id, webformatURL, largeImageURL, tags } = this.props;
    const { showModal } = this.state;
    return (
      <>
        <GalleryItem key={id} onClick={this.toggleModal}>
          <Image src={webformatURL} alt={tags} />
        </GalleryItem>
        {showModal && (
          <Modal onClose={this.toggleModal} src={largeImageURL} tags={tags} />
        )}
      </>
    );
  }
}
