import React from 'react'
import Gallery from "./Gallery";
import { Alert} from "react-bootstrap";



let rockArtists = [
    "queen",
    "u2",
    "thepolice",
    "eagles",
    "thedoors",
    "oasis",
    "thewho",
    "bonjovi",
  ];

  let popArtists = [
    "maroon5",
    "coldplay",
    "onerepublic",
    "jamesblunt",
    "katyperry",
    "arianagrande",
  ];

  let hipHopArtists = [
    "eminem",
    "snoopdogg",
    "lilwayne",
    "drake",
    "kanyewest",
  ];

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            rockSongInfo:[],
            popSongInfo:[],
            hipSongInfo:[],
            loading: true,
            error: false,
        }

    }

    componentDidMount = () =>{
        let rockRandomArtists = [];
        let popRandomArtists = [];
        let hipHopRandomArtists = [];

        while (rockRandomArtists.length < 4) {
          let artist =
            rockArtists[Math.floor(Math.random() * rockArtists.length)];

          if (!rockRandomArtists.includes(artist)) {
            rockRandomArtists.push(artist);
          }
        }

        while (popRandomArtists.length < 4) {
          let artist =
            popArtists[Math.floor(Math.random() * popArtists.length)];

          if (!popRandomArtists.includes(artist)) {
            popRandomArtists.push(artist);
          }
        }

        while (hipHopRandomArtists.length < 4) {
          let artist =
            hipHopArtists[Math.floor(Math.random() * hipHopArtists.length)];

          if (!hipHopRandomArtists.includes(artist)) {
            hipHopRandomArtists.push(artist);
          }
        }

        let headers = new Headers({
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "4013e328ffmsh3feb54311ce7296p1c3cc4jsnd3ad09e0821d",
          });

        let rockResArray = []
        for (let j = 0; j < rockRandomArtists.length; j++) {
          fetch(
            "https://deezerdevs-deezer.p.rapidapi.com/search?q=" +
              rockRandomArtists[j],
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
              let songInfo = artists.data;
              rockResArray.push(songInfo[0])
              this.setState({rockSongInfo: rockResArray})
              return rockResArray
            })
            .then(() => this.setState({ loading: false }))
            .catch((error) => {
              //this.setState({ error: true });
              console.log(error);
            });
        }
        

        let popResArray = []
        for (let j = 0; j < popRandomArtists.length; j++) {
            fetch(
              "https://deezerdevs-deezer.p.rapidapi.com/search?q=" +
                popRandomArtists[j],
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
                let songInfo = artists.data;
                popResArray.push(songInfo[0])
                this.setState({popSongInfo: popResArray})
                return popResArray
              })
              .then(() => this.setState({ loading: false }))
              .catch((error) => {
                //this.setState({ error: true });
                console.log(error);
              });
          }

  
          let hipResArray = []
          for (let j = 0; j < hipHopRandomArtists.length; j++) {
            fetch(
              "https://deezerdevs-deezer.p.rapidapi.com/search?q=" +
                hipHopRandomArtists[j],
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
                let songInfo = artists.data;
                hipResArray.push(songInfo[0])
                this.setState({hipSongInfo: hipResArray})
                return hipResArray
              })
              .then(() => this.setState({ loading: false }))
              .catch((error) => {
                //this.setState({ error: true });
                console.log(error);
              });
          }
          
    }




    render(){
        return (
            <div className="col-12 col-md-9 offset-md-3 mainPage pb-5">
              <div className="row">
                <div className="col-10 col-md-10 col-lg-10 p-0">
                  {this.state.error && (
                    <Alert variant="danger" className="text-center">
                      An error has occurred, please try again later
                    </Alert>
                  )}
                  
                    {!this.state.error && !this.props.toBeSearched.length > 0 && (
                    <>
                      <Gallery
                        title="Rock Classics"
                        loading={this.state.loading}
                        songs={this.state.rockSongInfo}
                      />
                      <Gallery
                        title="Pop Artist"
                        loading={this.state.loading}
                        songs={this.state.popSongInfo}
                      />
                      <Gallery
                        title="Hipop Top"
                        loading={this.state.loading}
                        songs={this.state.hipSongInfo}
                      />
                    </>
                    )}
                    {this.props.toBeSearched.length > 0 &&(
                    <Gallery
                      title={this.props.toBeSearched[0].artist.name}
                      songs={this.props.toBeSearched}
                    />
                  )}
                </div>
              </div>
            
            </div>
        )
    }
}

export default Home
