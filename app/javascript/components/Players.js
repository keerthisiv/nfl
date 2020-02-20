import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import Player from "./Player"
const Players = ({ players }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [sortValues, setSortValues] = useState({});
  const focusSearch = useRef(null);
  const focusSort = useRef(null);

  useEffect(() => {focusSearch.current.focus()}, [])
  useEffect(() => {focusSort.current.focus()}, [])

   const getPlayers = async (search, sort) => {
     let url = "http://localhost:3000/search?";
     if (search) {
       url = url + `name=${search}`
     }
     if (Object.keys(sort).length != 0) {
       url = url + `order=${Object.entries(sort).join(',')}`
     }

     const results = await fetch(url, {
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
      if (!searchValue && (Object.keys(sortValues).length === 0)) return setSearchResults([])

      await sleep(350)
      const sortValuesPresent = Object.keys(sortValues).length != 0
      if (currentQuery && (searchValue || sortValuesPresent)) {
        const playersResult = await getPlayers(searchValue, sortValues, controller)
        setSearchResults(playersResult)
      }
    }
    loadPlayers()

    return () => {
      currentQuery = false
      controller.abort()
    }
  }, [searchValue, sortValues])

  const handleSort = (value) => {
    if(sortValues[value] && sortValues[value] == 'asc') {
      setSortValues(values => ({...values, [value]: 'desc'}))
    } else {
      setSortValues(values => ({...values, [value]: 'asc'}))
    }
  }

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
            <th>
              <button
                ref={focusSort}
                onClick={(e) => handleSort("total_yards")}>
                total_yards Total Rushing Yards
              </button>
            </th>
            <th>Rushing Average Yards Per Attempt</th>
            <th>Rushing Yards Per Game</th>
            <th>
              <button
                ref={focusSort}
                onClick={(e) => handleSort("total_touch_down")}>
                Total Rushing Touchdowns
              </button>
            </th>
            <th>
              <button
                ref={focusSort}
                onClick={(e) => handleSort("longest_rush")}>
                Longest Rush
              </button>
            </th>
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
