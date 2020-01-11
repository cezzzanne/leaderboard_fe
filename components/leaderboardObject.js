import React from 'react'
import Link from 'next/link'
import { Form, FormInput, FormGroup, Button } from "shards-react";

class LeaderboardObject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {players: null, scores: null};
    }

    updateInput(e) {
        const element = event.target;
        const target = element.id;
        const value = element.value;
        this.setState({[target]: value});
    }


    addTeam() {

    }

    async componentDidMount() {
        await localStorage.setItem('data', this.props.data.players);
        const scores = this.props.data.players.map((player)=> {
            return <tr>
                <td>{player.user.username}</td>
                <td>{player.current_score}</td>
                <td>{player.score}</td>
                </tr>;
        });
        this.setState({scores});
    }



    render() {
        return (
           <div style={{width: '100%'}}>
               <table>
                   {this.state.scores }
               </table>

           </div>
        );
    }
}

export default LeaderboardObject