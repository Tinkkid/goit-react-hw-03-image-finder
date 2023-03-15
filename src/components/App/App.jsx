import { Component } from "react";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Searchbar } from "../Searchbar/Searchbar";
import { fetchPixbay } from '../../api_pixabay';
import { Container } from "./App.styled";
 
export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    totalImages: 0,
    loading: false,
    error: '',
  };

  allImageData = hits =>
      hits.map(({ id, tags, largeImageURL, webformatURL }) => ({
        id,
        tags,
        largeImageURL,
        webformatURL,
      }));

  componentDidUpdate = async (_, prevState) => {
      const { query, page } = this.state;

      if (prevState.query !== query || prevState.page !== page) {
        this.setState({ loading: true, error: '' });

        try {
          const getImage = await fetchPixbay(query, page);
          console.log(getImage);
          const requiredData = this.allImageData(getImage.hits);

          this.setState(prevState => {
            return {
              images: [...prevState.images, ...requiredData],
              totalImages: getImage.totalHits,
            };
          });
        }
        catch (error) {
          this.setState({ error: 'Something went wrong' });
        }
        finally {
          this.setState({ loading: false });
        }
      }
    };

  handleFormSubmit = query => {
    this.setState({ query, images: [], page: 1 });
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={this.state.images} />
      </Container>
    );
  }
};
