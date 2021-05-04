
import React, { useState, useEffect } from 'react'
import Parser from 'html-react-parser'
import noImage from '../../assets/images/no-image.png'
import './TrackModal.scss'

export default function TrackModal({ track, toggleModal }) {

    const [iframe, setIframe] = useState('')

    useEffect(() => {
        const SC = window.SC
        SC.initialize({
            client_id: 'ggX0UomnLs0VmW7qZnCzw'
        });

        var track_url = track.permalink_url;
        SC.oEmbed(track_url, { auto_play: true }).then(function (oEmbed) {
            console.log('oEmbed response: ', oEmbed);
            setIframe(oEmbed.html)
        });
    }, [])

    let trackImg;
    if (track.artwork_url) {
        trackImg = <img className="track-img" src={track.artwork_url} alt="track-img"></img>
    } else {
        trackImg = <img className="track-img" src={noImage} alt="track-img"></img>
    }

    return (
        <section className="track-modal-container">
            <div className="track-modal flex column align-center">
                <button className="cls-btn" onClick={() => toggleModal(false)}><i className="fas fa-times"></i></button>
                <div className="track-content flex">
                    <div className="track-details">
                        <p className="track-title">{track.title}</p>
                        {track.description && <p className="track-desc">{track.description}</p>}
                    </div>
                    {trackImg}
                </div>
                {Parser(iframe)}
            </div>
        </section>
    )
}

