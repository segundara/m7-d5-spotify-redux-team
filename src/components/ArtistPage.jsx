import React, { Component } from 'react'
import {Image} from 'react-bootstrap'
import {Link} from 'react-router-dom';

class Artist extends React.Component {
  constructor(props){
    super(props);
    this.state={
      artistInfo:'',
      albumInfo:[]
    }
  }

  componentDidMount = () =>{
    let artistId = this.props.match.params.id;

        let headers = new Headers({
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          "x-rapidapi-key":
            "4013e328ffmsh3feb54311ce7296p1c3cc4jsnd3ad09e0821d",
        });

        fetch("https://deezerdevs-deezer.p.rapidapi.com/artist/" + artistId, {
          method: "GET",
          headers,
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((artist) => {
              console.log(artist)
              console.log(artist.name)
              this.setState({artistInfo: artist})
                
                fetch("https://deezerdevs-deezer.p.rapidapi.com/artist/"+artistId+"/top?limit=50", {
                method: "GET",
                headers,
                })
                .then((response) => {
                    if (response.ok) {
                      console.log(response)
                    return response.json();
                    }
                })
                .then((artistAlbum) => {
                    let albumInfo = artistAlbum.data;
                    this.setState({albumInfo})
                    console.log(albumInfo)
                })

          });

  }

  displayHead = (artist) => {
    return(
      <>
      <h2 className="titleMain">{artist.name}</h2>
      <div id="followers">{artist.nb_fan} followers</div>
      <div className="d-flex justify-content-center" id="button-container">
      <button className="btn btn-success mr-2 mainButton" id="playButton">
          PLAY
      </button>
      <button
          className="btn btn-outline-light mainButton"
          id="followButton"
      >
          FOLLOW
      </button>
      </div>
      </>
      )
}

displayAlbum = (albumInfo) => {
  return albumInfo.map((album, i)=>{
  return(
    <div className="col-sm-auto col-md-3 text-center mb-5" key={i}>
        <a href="">
            <Image
            className="img-fluid"
            src={album.album.cover_medium} alt=""
            />
        </a>
        <p>
            <a href="#"> Track: {album.title} </a>
            <br/>
            <Link to={`/album/`+album.album.id} className="wrap">
            Album: {album.album.title}
            </Link>
        </p>
    </div>
    )
  })

  
}


  render(){
    return (
        <div className="col-12 col-md-9 offset-md-3 mainPage">
          <div className="row">
            <div className="col-12 col-md-10 col-lg-10 mt-5" id="artist-header">{this.displayHead(this.state.artistInfo)}</div>
          </div>
          <div className="row mb-3">
            <div className="col-10 col-md-10 col-lg-10 p-0">
              <div className="mt-4 d-flex justify-content-start">
                <h2 className="text-white font-weight-bold">Tracks</h2>
              </div>
              <div className="pt-5 mb-5">
                <div className="row" id="apiLoaded">{this.displayAlbum(this.state.albumInfo)}</div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Artist
