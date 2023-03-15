import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import {GalleryList} from './ImageGallery.styled'

export const ImageGallery = ({images}) => {
//   componentDidUpdate(prevProps, prevState) {
//     const prevName = prevProps.query;
//     const nextName = this.props.query;

//     if (prevName !== nextName) {
//       this.setState({ status: Status.PENDING });
//     }

//     apiPixabay
//       .fetchPixbay(nextName)
//       .then(images => this.setState({ images, status: Status.RESOLVED }))
//       .catch(error => this.setState({ error, status: Status.REJECTED }));
//   }  
   return (
     <GalleryList>
       {images.map(({ id, webformatURL, largeImageURL, tags }) => (
         <ImageGalleryItem key={id} webformatURL={webformatURL} tags={tags} />
       ))}
     </GalleryList>
   );
  
}
