import React from "react"

const Player = ({ player }) => {
  const { Player, Team, Pos } = player;
  return (
    <React.Fragment>
      <td>{Player}</td>
      <td>{Team}</td>
      <td>{Pos}</td>
    </React.Fragment>
  );
}

export default Player;
