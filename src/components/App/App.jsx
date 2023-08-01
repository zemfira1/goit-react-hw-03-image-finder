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
    if (data.tag === '') {
      console.log('нет запроса');
      Notiflix.Notify.warning('You have not entered search query!');
      return;
    }
    this.setState(prevState=>({
      tag: data.tag,
      images: [],
      currentPage: 1,
    }));
  }

  componentDidUpdate(_, prevState) {
    
    if (prevState.currentPage !== this.state.currentPage || prevState.tag !== this.state.tag) {    
      this.setState({ isLoading: true});

      const { tag, currentPage } = this.state;

      getPhoto(tag, currentPage)
        .then(r => {  

          if (r.hits.length === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query.');
            return;
          }

          if (r.hits.length !== 0) {
            this.setState( prevstate=> ({
              images: [...prevState.images, ...r.hits],
            }));
            
            if (this.state.currentPage < Math.ceil(r.totalHits / 12)) {
              this.setState({ isButton: true });
            } else {
              this.setState({ isButton: false });
            }
          }   
        })
        .catch(error => this.setState({isError: true, error}))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  loadMoreImages = (event) => {
    event.preventDefault(); // не понимаю,почему всё равно перезагружает при добавлении новых картинок
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  }
  
  render() {
    return (
      <Container>        
        <Searchbar onSubmit={this.formSubmit} />

        {this.state.isLoading
          ? <Loader />
          : <ImageGallery images={this.state.images} />
        }
        {this.state.isButton &&
            <Button onClick={this.loadMoreImages } />
        }
      </Container>
    );
  } 
};
