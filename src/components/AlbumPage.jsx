import React from 'react'
import {Link} from 'react-router-dom';

class Album extends React.Component {
  constructor(props){
    super(props);
    this.state={
      albums: [],
      tracks:[],
      artist:[],
    }
    console.log(this.props)
  }
  
  
  albumToFooter = (albumId, albumCover, albumLabel, albumTitle) => (
    this.props.sendAlbum(albumId, albumCover, albumLabel, albumTitle)
    )

  componentDidMount = () =>{
    let albumId = this.props.match.params.id;

    let headers = new Headers({
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      "x-rapidapi-key":
        "4013e328ffmsh3feb54311ce7296p1c3cc4jsnd3ad09e0821d",
    });

    fetch("https://deezerdevs-deezer.p.rapidapi.com/album/" + albumId, {
      method: "GET",
      headers,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((albumList) => {
        let album = albumList
        let artist = albumList.artist
        let tracks = albumList.tracks.data

        this.albumToFooter(albumId, album.cover_small, album.label, album.title)
        
        this.setState({albums: album, artist: artist, tracks: tracks})
        console.log(this.state.albums)
        console.log(this.state.artist)
        console.log(this.state.tracks)

      });
  }


  
  albumArt = (album, artist) => {
    return (
      <>
    <img
      src={album.cover_medium}
      className="card-img img-fluid"
      alt="cover image of ${album.label}"
    />
    <div className="mt-4 text-center">
      <p className="album-title">{album.label}</p>
    </div>
    <div className="text-center">
      <Link to={`/artist/`+artist.id}><p className="artist-name">{artist.name}</p></Link>
    </div>
    <div className="mt-4 text-center">
      <button id="btnPlay" className="btn btn-success" type="button">
        Play
      </button>
    </div>
    </>
    );
  };

  song = (song) => {
    return(
    song.map((track, i)=>{
      return (
        <div className="py-3 trackHover" key={i}>
          <a
            href="#"
            className="card-title trackHover px-3"
            style={{color: "white"}}
            >{track.title}</a>
          <small className="duration pr-3" style={{color: "white"}}
            >{(track.duration / 60).toFixed(2)}</small>
        </div>
        );
    })
    )
  };
          


  render(){
    return (
        <div className="col-12 col-md-9 offset-md-3 mainPage">
          <div className="row">
            <div className="col-md-3 pt-5 text-center" id="img-container">{this.albumArt(this.state.albums, this.state.artist)}</div>
            <div className="col-md-8 p-5">
              <div className="row">
                <div className="col-md-10 mb-5" id="trackList">
                {this.song(this.state.tracks)}
                  </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Album
