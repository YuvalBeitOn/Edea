
import React from 'react'
import './RecentSearches.scss'

export default function RecentSearches({ searches, getRecentSearch }) {

    let lastSearches;
    if (searches.length < 1) lastSearches = <div className="no-searches">No searches yet...</div>
    else lastSearches = <ul className="recent-searches-list clean-list">
        {searches.map((searchTerm, index) => <li key={index} className="serach-term" onClick={() => getRecentSearch(searchTerm)}>{searchTerm}</li>
        )}
    </ul>

    return (
        <section className="recent-searches-container">
            <h2>Recent Searches</h2>
            {lastSearches}
        </section>
    )
}

