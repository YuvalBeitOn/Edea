
import React, { useState } from 'react'
import TrackModal from '../TrackModal/TrackModal'
import TrackPreview from '../TrackPreview/TrackPreview'
import './TrackList.scss'

export default function TrackList({ tracks, view }) {

    const [isModalShown, toggleModal] = useState(false)
    const [track, setTrack] = useState({})

    const openTrackModal = (track) => {
        if (isModalShown) {
            console.log('open')
            return;
        } else {
            setTrack(track)
            toggleModal(true)
        }
    }

    return (
        <section className="track-list-container flex">
            <ul className={`track-list clean-list ${view}`}>
                {tracks.map((track, idx) => <div className="track-preview-container" onClick={() => openTrackModal(track)} key={idx}><TrackPreview key={track.id} track={track} view={view}></TrackPreview></div>)}
            </ul>
            {isModalShown && <TrackModal track={track} toggleModal={toggleModal}></TrackModal>}
        </section>
    )
}

