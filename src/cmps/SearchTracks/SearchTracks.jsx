
import React, { useState, useEffect, useRef } from 'react'
import RecentSearches from '../RecentSearches/RecentSearches'
import './SearchTracks.scss'

export default function SearchTracks({ handleSetTracks }) {
    const SC = window.SC
    let timeOutId = null;

    const inputRef = useRef();
    let formRef = useRef();

    const [nextResultsUrl, setNextUrl] = useState('')
    const [recentSearches, setSearches] = useState([])
    const [isBtnShown, setBtn] = useState(false)


    useEffect(() => {
        let recentSearches = JSON.parse(localStorage.getItem('recentSearches'))
        if (recentSearches) setSearches(recentSearches)
    }, [])

    useEffect(() => {
        if (recentSearches.length > 5) {
            setSearches(recentSearches.slice(-5))
        }
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    }, [recentSearches])

    useEffect(() => {
        if (nextResultsUrl !== '') setBtn(true)
        if (nextResultsUrl === null) setBtn(false)
    }, [nextResultsUrl])


    const handleAddSearch = (searchTerm) => {
        const idx = recentSearches.findIndex(currSearch => currSearch === searchTerm)
        if (idx !== -1) return
        setSearches(recentSearches.concat(searchTerm))
    }

    const handleInputChange = () => {
        const searchTerm = inputRef.current.value;
        if (timeOutId) clearTimeout(timeOutId) // debounce get tracks
        if (searchTerm === '') {
            handleSetTracks([])
            setBtn(false)
            return;
        } else {
            timeOutId = setTimeout(() => {
                getTracks(searchTerm)
            }, 1500)
        }
    }


    const getTracks = (searchTerm) => {
        handleAddSearch(searchTerm)
        SC.initialize({
            client_id: 'ggX0UomnLs0VmW7qZnCzw'
        });

        SC.get('/tracks', {
            q: searchTerm, license: 'cc-by-sa', limit: 6, linked_partitioning: 1
        }).then(function (tracks) {
            handleSetTracks(tracks.collection)
            setNextUrl(tracks.next_href)
        });
    }

    const getNextResults = async () => {
        await fetch(nextResultsUrl)
            .then(res => res.json())
            .then(
                (tracks) => {
                    if (tracks.collection.length < 6) setBtn(false)
                    handleSetTracks(tracks.collection)
                    setNextUrl(tracks.next_href)
                },
                (error) => {
                    console.error('Can not fetch more results', error)
                }
            )
    }


    const getRecentSearch = (searchTerm) => {
        formRef.current.reset();
        getTracks(searchTerm)
    }


    return (
        <section className="search-tracks-container flex">
            <div className="form-container">
                <form className="search-tracks" ref={formRef}>
                    <input type="text" onChange={handleInputChange} ref={inputRef} placeholder="Search Tracks..." spellCheck="false" />
                </form>
                {isBtnShown && <button className="next-results-btn" onClick={getNextResults}>More Results</button>}
            </div>
            <RecentSearches searches={recentSearches} getRecentSearch={getRecentSearch}></RecentSearches>
        </section>
    )
}




