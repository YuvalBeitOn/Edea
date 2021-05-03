
import React, { Fragment } from 'react'
import noImage from '../../assets/images/no-image.png'
import './TrackPreview.scss'

export default function TrackPreview({ track, view }) {

    let trackImg;
    if (track.artwork_url) {
        trackImg = <img className={`track-img ${view}`} src={track.artwork_url} alt="track-img"></img>
    } else {
        trackImg = <img className={`track-img ${view}`} src={noImage} alt="no-img"></img>
    }

    return (
        <Fragment>
            <li className={`track-preview ${view}`} >
                {trackImg}
                <p className={`track-title ${view}`}>{track.title}</p>
            </li>
        </Fragment>
    )
}

