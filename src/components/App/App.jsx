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
    currentHits: 0,
    totalHits: 0,
    isLoading: false,
    isError: false,
    error: null,  
    isButton: false,
  }

  formSubmit = data => {
    this.setState({ tag: data.tag, currentPage: 1, isLoading: true  });    

    getPhoto(data.tag)
      .then(r => {  
      if (r.hits.length !== 0) {
        this.setState({
          images: r.hits,
          isLoading: false,
          isButton: true,
          currentHits: r.hits.length,
          totalHits: r.totalHits,
        });
      } else {
        Notiflix.Notify.failure(
          'You have not entered search query or there are no images matching your search query. Please, try again.'
        );
      }
    })
      .catch(error => this.setState({isError: true, error, isButton: false }))
      .finally(() => this.setState({isLoading: false}));
  };

  componentDidUpdate(_, prevState) {
    
    if (prevState.currentPage !== this.state.currentPage) {
      console.log(`Привет! Ты  на следующей странице${this.state.currentPage}`);
    
      this.setState({ isLoading: true, isError: false, isButton: false });

      const { tag, currentPage } = this.state;

      getPhoto(tag, currentPage)
        .then(r => {  
          if (r.hits.length !== 0) {
            this.setState( prevstate=> ({
              images: [...prevState.images, ...r.hits],
              isLoading: false,
              currentHits: prevState.currentHits + r.hits.length,
            }));
            
            const difference = this.state.totalHits - this.state.currentHits;
            if (difference > r.hits.length) {
              this.setState({isButton: true})
            } else {
              this.setState({isButton: false})
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
