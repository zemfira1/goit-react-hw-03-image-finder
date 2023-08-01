import { Component } from 'react';
import { Container } from './App.styled';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
import { getPhoto } from 'components/Api';
import Notiflix from 'notiflix';

export class App extends Component {

  state = {
    tag: '',
    images: [],
    currentPage: 1,
    isLoading: false,
    isButton: false,
    isError: false,
    error: null,  
    
  }
  formSubmit = data => {
    if (data.tag === this.state.tag) {
      return;
    }
    
    this.setState({
      tag: data.tag,
      images: [],
      currentPage: 1,
    });
  }

  componentDidUpdate(_, prevState) {
    const { tag, currentPage } = this.state;
    
    if (prevState.currentPage !== currentPage || prevState.tag !== tag) {    
      this.setState({ isLoading: true});

      getPhoto(tag, currentPage)
        .then(r => {  
          if (r.hits.length === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query.');
            return;
          }

          this.setState( prevState=> ({
            images: [...prevState.images, ...r.hits],
            isButton: this.state.currentPage < Math.ceil(r.totalHits / 12),
          }));
          }   
        )
        .catch(error => this.setState({isError: true, error}))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  loadMoreImages = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  }
  
  render() {
    const arrayLength = this.state.images.length; 
    const { isLoading, isButton, images } = this.state;

    return (
      <Container>        
        <Searchbar onSubmit={this.formSubmit} />
        {isLoading && <Loader />}
        {arrayLength!==0 && <ImageGallery images={images} />}        
        {isButton && <Button onClick={this.loadMoreImages } />}
      </Container>
    );
  } 
};
