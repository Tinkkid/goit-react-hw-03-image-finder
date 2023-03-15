import { Component } from "react";
import {
  SearchWrap,
  SearchBtn,
  SearchForm,
  SearchLabel,
  SearchInput,
} from './Searchbar.styled';

export class Searchbar extends Component{
   state = {
   query:'',
}

   handleChange = event => {
      this.setState({ query: event.target.value })
   }

   handleSubmit = event => {
      event.preventDefault();
      if (this.state.query.trim() === '') {
         alert('empty');
         return;
      }

      this.props.onSubmit(this.state.query.trim().toLowerCase());
      this.setState({query: ''})
   }

   render() {
      const { query } = this.state;
   return (
     <SearchWrap>
       <SearchForm onSubmit={this.handleSubmit}>
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
