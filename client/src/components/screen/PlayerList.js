import React, {Component} from "react";
import {GameContext} from "../GameContext"
import axios from "../../js/axios"

class PlayerList extends Component {
  static contextType = GameContext;

  async componentDidMount() { 
    const [lobby] = this.context;
    this.players = lobby[0].players;
    const gameid = lobby[0].gameid;
    if(gameid === "") return;

    try {
      setInterval(async () => {
        const { data } = await axios.post("/lobby/players", { info: {gameid} } );
        const [players] = [data.players]
        console.log("DATA: " + players);
        const [,setLobby] = this.context;
        setLobby([{
          gameid: lobby[0].gameid,
          mode: lobby[0].mode,
          players: data.players
        }]);
      }, 3000);
    } catch(e) {
      console.log(e);
    }
  }

  render() { 
      const playerStyle = {
        fontSize: "4vmin",
        fontFamily: "Bangers",
        textShadow: "1vmin 1vmin 2vmin black"
      }
      const playerListStyle = {
        position: "fixed",
        bottom: "0px",
        width: "100%"
      }
      const [lobby] = this.context;
      const players = lobby[0].players;
      return (
        <div style={playerListStyle}>
          <div className="container row center-align">
            <div className="col s12 l10 offset-l1 card black">
              {players && players.map((player) => 
                <div className="col s4 m3 l3" key={player}>
                  <div className="white-text center" style={playerStyle}>{player}</div>
                </div>
              )}
            </div>
          </div>
        </div>
        );
  }
}
 
export default PlayerList;