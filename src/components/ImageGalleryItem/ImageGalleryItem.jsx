import { Component } from "react";
import { GalleryItem, Image } from './ImageGalleryItem.styled';


export class ImageGalleryItem extends Component {

   render() {
       const { id, webformatURL, largeImageURL, tags } = this.props;
      return (
        <GalleryItem key={id}>
          <Image src={webformatURL} alt={tags} />
        </GalleryItem>
      );
   }
   
};