import React, { Component } from "react";
import { Col,} from "react-bootstrap";
import { Link } from 'react-router-dom';

class Song extends Component {
  render() {
      //console.log(this.props)
    return (
      <Col className="mb-2" key={this.props.song.id}>
        <img
          className="img-fluid"
          src={this.props.song.album.cover_medium}
          alt="song"
        />
        <p> 
            <Link to={location => `/album/${this.props.song.album.id}`}>
               Album: {this.props.song.album.title}
            </Link>
               <br></br>
            <Link to={location => `/artist/${this.props.song.artist.id}`} >
                Artist: {this.props.song.artist.name}
            </Link>
        </p>


      </Col>
    );
  }
}

export default Song;
