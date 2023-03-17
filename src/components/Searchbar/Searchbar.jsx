import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
  SearchWrap,
  SearchBtn,
  SearchForm,
  SearchLabel,
  SearchInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    query: '',
    images: [],
  };

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      return toast.error('Please enter your search query', {
        duration: 3000,
        position: 'top-right',
        style: {
          border: '2px solid #1258c7',
          padding: '16px',
          background: '#e4e28e',
        },
      });
    }
    this.props.onSubmit(this.state.query.trim().toLowerCase());
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    return (
      <SearchWrap>
        <SearchForm onSubmit={this.handleSubmit}>
          <Toaster />
          <SearchBtn type="submit">
            <SearchLabel>Search</SearchLabel>
          </SearchBtn>

          <SearchInput
            value={query}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchWrap>
    );
  }
}
