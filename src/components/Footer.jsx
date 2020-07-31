import React from 'react'
import {Link, withRouter } from 'react-router-dom';

const Footer = (props) => {
    console.log(props.albumCover)
    console.log(props)
    return (        
        <div className="container-fluid fixed-bottom bg-container pt-1">
            <div className="row">
                <div className="col-lg-3">
                    {props.location.pathname === '/album/'+ props.albumId 
                    ?(
                    <div className="row text-white">
                        <div className="col-4">
                            <img
                                src={props.albumCover}
                                style={{height:"5rem", width: "5rem"}}
                                className="card-img img-fluid"
                                alt="cover image of album"
                            />
                            
                        </div>
                        <div className="col d-flex flex-column pt-3">
                            <small>{props.albumLabel}</small>
                            <small>{props.albumTitle}</small>
                        </div>
                    </div>
                    )
                    :null}
                </div>
                <div className="col-lg-9">
                    <div className="row d-flex justify-content-center">
                        <div className="col-6 col-md-4 col-lg-2 playerControls mt-1">
                            <div className="row">
                            <a href="#">
                                <img src="playerbuttons/Shuffle.png" alt="shuffle" />
                            </a>
                            <a href="#">
                                <img src="playerbuttons/Previous.png" alt="shuffle" />
                            </a>
                            <a href="#">
                                <img src="playerbuttons/Play.png" alt="shuffle" />
                            </a>
                            <a href="#">
                                <img src="playerbuttons/Next.png" alt="shuffle" />
                            </a>
                            <a href="#">
                                <img src="playerbuttons/Repeat.png" alt="shuffle" />
                            </a>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center playBar py-3">
                        <div className="col-8 col-md-6">
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    aria-valuenow="0"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Footer)
