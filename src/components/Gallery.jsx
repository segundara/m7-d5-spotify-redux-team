import React from "react";
import { Row, Spinner } from "react-bootstrap";
import Song from "./Song";

const Gallery = ({ title, loading, fetchComments, comments, songs, album, artist }) => (
  <>
    <h4 className="mt-5">{title}</h4>
    <Row className="row-cols-1 row-cols-md-4 mb-4 text-center">
      {loading
        ? [0, 1, 2, 3].map((song) => (
            <div style={{ width: "10%", height: "auto" }} key={song}>
              <Spinner animation="border" variant="light" />
            </div>
          ))
        : songs.map((song) => (
            <Song 
            key={song.id}
            song={song}
            />
            ))
                
            }
    </Row>
  </>
);

export default Gallery;
