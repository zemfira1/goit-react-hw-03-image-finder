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
    perPage: 12,
    isLoading: false,
    isError: false,
    error: null,  
    isButton: false,
  }

  formSubmit = async data => {
    console.log(data.tag);
    await this.setState({ tag: data.tag });

    this.state.currentPage = 1;
    this.setState({ isLoading: true }); 
    

    const { tag, currentPage, perPage } = this.state;

    getPhoto(tag, currentPage, perPage)
      .then(r => {  
      if (r.hits.length !== 0 && tag !=='') {
        this.setState({
          images: r.hits,
          isLoading: false,
          currentHits: r.totalHits - perPage,
          isButton: true,
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
    }

    //this.setState({ isLoading: true, isError: false });

    // const { tag, currentPage, perPage } = this.state;

    // getPhoto(tag, currentPage, perPage)
    //   .then(r => {  
    //     if (r.hits.length !== 0) {
        
    //     const newImages = r.hits.map(
    //       ({ id, tag, webformatURL, largeImageURL }) => ({
    //         id,
    //         tag,
    //         webformatURL,
    //         largeImageURL,
    //       })
    //     );

    //     this.setState( prevstate=> ({
    //       images: [...prevState.images, ...newImages],
    //       isLoading: false,
    //       currentHits: prevstate.currentHits - perPage,
    //     }));
    //   }})
    //   .catch(error => this.setState({isError: true, error}))
    //   .finally(() => this.setState({isLoading: false}));

  }

  loadMoreImages = async() => {
    await this.setState(prevState => ({
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
