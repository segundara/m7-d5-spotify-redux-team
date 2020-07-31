import React from 'react';
//import logo from './logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import SideNav from './components/SideNav'
import TopNav from './components/TopNav';
import Footer from './components/Footer';
import Home from './components/Home';
import Artist from './components/ArtistPage';
import Album from './components/AlbumPage';

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      searchedSongs: [],
      albumId: null,
      albumCover: null,
      albumLabel: null, 
      albumTitle: null
    };
  }

  albumToFooter = (albumId,albumCover, albumLabel, albumTitle) => this.setState({albumId, albumCover, albumLabel, albumTitle})
  
  showSearchResult = (searchString) => {
    console.log(searchString)
    let headers = new Headers({
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      "x-rapidapi-key": "4013e328ffmsh3feb54311ce7296p1c3cc4jsnd3ad09e0821d",
    });
      fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + searchString,
        {
          method: "GET",
          headers,
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((artists) => {
          let songs = artists.data;
          this.setState({searchedSongs: songs})
          console.log(this.state.searchedSongs)
        })
        .catch((error) => {
          console.log(error);
        });
  };

  render(){
    console.log(this.state.albumId)
  return (
    <Router>
      <SideNav  showSearchResult={this.showSearchResult}/>
      <TopNav/>
      <Route path='/' exact render={(props) => <Home {...props} toBeSearched={this.state.searchedSongs} />} />
      <Route path='/artist/:id' exact component={Artist} />
      <Route path='/album/:id' exact render={(props) => <Album {...props} sendAlbum={this.albumToFooter} />} />
      <Footer albumId={this.state.albumId} albumCover={this.state.albumCover} albumLabel={this.state.albumLabel} albumTitle={this.state.albumTitle}/>
    </Router>
  );
}
}

export default App;
