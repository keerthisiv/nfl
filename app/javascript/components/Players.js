import React from "react"
import PropTypes from "prop-types"
import Player from "./Player"
class Players extends React.Component {
  playerRows = () => {
    return (
      this.props.players.map(player => (<tr><Player player={player} /></tr>))
    );
  }

  render () {
    return (
      <div>
        <h1> All Players </h1>
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
            {this.playerRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

Players.propTypes = {
  players: PropTypes.array
};
export default Players
