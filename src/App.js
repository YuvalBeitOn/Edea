import React, { useState, useEffect } from 'react'
import './App.scss'
import './scss/global.scss'
import tileView from './assets/images/tile.png'
import listView from './assets/images/list.png'


import SearchTracks from './cmps/SearchTracks/SearchTracks'
import TrackList from './cmps/TrackList/TrackList'

export default function App() {


  useEffect(() => {
    let tracksView = JSON.parse(localStorage.getItem('tracksView'))
    if (tracksView) setView(tracksView)
  }, [])


  const [tracks, setTracks] = useState([])
  const [view, setView] = useState('list')

  const handleSetTracks = (tracks) => {
    setTracks(tracks)
  }

  const handleChangeView = (view) => {
    localStorage.setItem('tracksView', JSON.stringify(view));
    setView(view)
  }


  return (
    <div className="App flex column">
      <SearchTracks handleSetTracks={handleSetTracks}></SearchTracks>
        {tracks.length > 0 && <TrackList tracks={tracks} view={view}></TrackList>}
        <div className="btns-container flex">
          <button className="view-btn" onClick={() => handleChangeView('list')}><img src={listView} alt="list-view"></img></button>
          <button className="view-btn" onClick={() => handleChangeView('tile')} > <img src={tileView} alt="tile-view"></img></button>
        </div>
    </div>
  );
}

