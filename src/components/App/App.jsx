import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Searchbar } from '../Searchbar/Searchbar';
import ApiPixbay from '../../api_pixabay';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    error: '',
    status: 'idle',
    message: '',
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query) {
      this.setState({ page: 1 });
      this.setState({ status: 'pending' });
      this.getDataFromPixbay();
    }
    if (prevState.page !== page) {
      this.getDataFromPixbay();
    }
  }

  getDataFromPixbay = () => {
    const { query, page } = this.state;

    ApiPixbay.fetchPixbay(query, page)
      .then(images =>
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          status: 'resolved',
        }))
      )
      .catch(error =>
        this.setState({
          error,
          status: 'rejected',
        })
      );
  };

  errorMessage = () => {
    const { images, query } = this.state;
    if (images.length === 0) {
      toast(`There are no images of ${query}, try some else`, {
        duration: 4000,
        position: 'top-right',
        icon: '🙀',
      });
    }
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleFormSubmit = query => {
    this.setState({ query, images: [], page: 1, status: 'resolved' });
  };

  render() {
    const { images, status } = this.state;
    if (status === 'idle') {
      return <Searchbar onSubmit={this.handleFormSubmit} />;
    }

    if (status === 'pending') {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <Loader />
        </>
      );
    }

    if (status === 'rejected') {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          {this.state.message && <Toaster />}
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery images={images} />
          {images.length > 0 && <Button onClick={this.onLoadMore} />}
        </>
      );
    }
  }
}

// export class App extends Component {
//   state = {
//     images: [],
//     query: '',
//     page: 1,
//     loading: false,
//     error: '',
//   };

//   allImageData = hits => {
//     console.log(
//       hits.map(({ id, tags, largeImageURL, webformatURL }) => ({
//         id,
//         tags,
//         webformatURL,
//         largeImageURL,
//       }))
//     );
//     return hits.map(({ id, tags, largeImageURL, webformatURL }) => ({
//       id,
//       tags,
//       webformatURL,
//       largeImageURL,
//     }));
//   };

//   componentDidUpdate = async (_, prevState) => {
//     const { query, page } = this.state;
//     this.setState({ loading: true });
//     if (prevState.query !== query || prevState.page !== page) {
//       this.getDataFromPixbay(query, page);
//     }
//   };

//   getDataFromPixbay = async (query, page) => {
//     try {
//       const getImage = await fetchPixbay(query, page);
//       const requiredData = this.allImageData(getImage.hits);

//       this.setState(prevState => {
//         return {
//           images: [...prevState.images, ...requiredData],
//           loading: false,
//         };
//       });

//       if (requiredData.length === 0) {
//         toast(`There are no images of ${query}, try some else`, {
//           duration: 4000,
//           position: 'top-right',
//           icon: '🙀',
//         });
//       }
//     } catch (error) {
//       this.setState({ error: 'Something went wrong' });
//     } finally {
//       this.setState({ loading: false });
//     }
//   };

//   onLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   handleFormSubmit = query => {
//     this.setState({ query, images: [], page: 1 });
//   };

//   render() {
//     const { images } = this.state;
//     return (
//       <Container>
//         <Toaster />
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         <ImageGallery images={images} />
//         {this.state.loading && <p>FFFFFFFFFFF</p>}
//         <Button onClick={this.onLoadMore} />
//       </Container>
//     );
//   }
// }
