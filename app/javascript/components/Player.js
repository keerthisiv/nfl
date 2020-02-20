import React from "react"

const Player = ({ player }) => {
  const { id, name, position } = player;
  const teamName = player.team.name;
  const {
    attempts_per_game,
    attempts,
    total_yards,
    average_yards_per_attempt,
    yards_per_game,
    total_touch_down,
    longest_rush,
    first_down,
    first_down_percentage,
    twenty_plus_rush,
    fourty_plus_rush,
    fumbles
  } = player.performances[0]
  return (
    <React.Fragment key={id}>
      <td>{name}</td>
      <td>{teamName}</td>
      <td>{position}</td>
      <td>{attempts_per_game}</td>
      <td>{attempts}</td>
      <td>{total_yards}</td>
      <td>{average_yards_per_attempt}</td>
      <td>{yards_per_game}</td>
      <td>{total_touch_down}</td>
      <td>{longest_rush}</td>
      <td>{first_down}</td>
      <td>{first_down_percentage}</td>
      <td>{twenty_plus_rush}</td>
      <td>{fourty_plus_rush}</td>
      <td>{fumbles}</td>
    </React.Fragment>
  );
}

export default Player;
