import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import Player from "./Player"
const Players = ({ players }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const focusSearch = useRef(null);

  useEffect(() => {focusSearch.current.focus()}, [])

   const getPlayers = async (query) => {
     const results = await fetch(`http://localhost:3000/search?name=${query}`, {
       headers: {'accept': 'application/json'}
     })
     const playersResult = await results.json()
     return playersResult.players
    }

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  useEffect(() => {
    let currentQuery = true
    const controller = new AbortController()

    const loadPlayers = async () => {
      if (!searchValue) return setSearchResults([])

      await sleep(350)
      if (currentQuery && searchValue) {
        const playersResult = await getPlayers(searchValue, controller)
        setSearchResults(playersResult)
      }
    }
    loadPlayers()

    return () => {
      currentQuery = false
      controller.abort()
    }
  }, [searchValue])

  const playersList = searchResults.length == 0 ? players : searchResults

    return (
      <div>
        <h1> All Players </h1>
        <input type="text"
          type="name"
          placeholder="Search for a Player..."
          ref={focusSearch}
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue} />
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Team</th>
              <th>Position</th>
              <th>Rushing Attempts</th>
              <th>Rushing Attempts Per Game Average</th>
              <th>Rushing Attempts Per Game Average</th>
              <th>Total Rushing Yards</th>
              <th>Rushing Average Yards Per Attempt</th>
              <th>Rushing Yards Per Game</th>
              <th>Total Rushing Touchdowns</th>
              <th>Longest Rush</th>
              <th>Rushing First Downs</th>
              <th>Rushing First Down Percentage</th>
              <th>Rushing 20+ Yards Each</th>
              <th>Rushing 40+ Yards Each</th>
              <th>Rushing Fumbles</th>
            </tr>
          </thead>
          <tbody>
            {playerRows(playersList)}
          </tbody>
        </table>
      </div>
    );
}

const playerRows = (players) => {
  return (
    players.map(player => (<tr><Player player={player} /></tr>))
  );
}

Players.propTypes = {
  players: PropTypes.array
};
export default Players
