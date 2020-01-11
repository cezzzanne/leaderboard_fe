import React from 'react'
import Link from 'next/link'
import { Form, FormInput, FormGroup, Button } from "shards-react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "shards-react";

class LeaderboardObject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {players: null, scores: null, addScoreModal: false, score: null};
        this.addScore = this.addScore.bind(this);
        this.toggle = this.toggle.bind(this);
        this.updateInput = this.updateInput.bind(this);
    }

    updateInput(e) {
        const element = event.target;
        const target = element.id;
        const value = element.value;
        this.setState({[target]: value});
    }


    toggle() {
        this.setState({addScoreModal: !this.state.addScoreModal});
    }


    async addScore() {
        const userID = await localStorage.getItem('userID');
        const leaderboardID = this.props.data.id;
        const score = this.state.score;
        fetch('http://127.0.0.1:8000/api/leaderboard/add-score',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userID,
                    leaderboardID,
                    score
                })
            }).then(async (res) => {
                const data = await res.json();
        }).catch((error) => {
            this.setState({loading: false});
        });
    }

    async componentDidMount() {
        if (this.props.data) {
            this.props.data.players.sort((playerA, playerB) => {
                return playerA.current_score - playerB.current_score
            });
            const scores = this.props.data.players.map((player) => {
                return <tr>
                    <td>{player.user.username}</td>
                    <td>{player.current_score}</td>
                    <td>{player.score}</td>
                </tr>;
            });
            this.setState({scores});
        }
    }

    updateInput(e) {
        const element = event.target;
        const target = element.id;
        const value = element.value;
        this.setState({[target]: value});
    }


    render() {
        return (
           <div style={{width: '100%'}}>
               <Modal open={this.state.addScoreModal} toggle={this.toggle}>
                   <ModalHeader>Update your score for this week</ModalHeader>
                   <ModalBody>
                       <Form style={{maxWidth: '14vw'}}>
                           <FormGroup>
                               <label htmlFor="#score">Score Logged</label>
                               <FormInput type="number" onChange={this.updateInput} value={this.state.usernameLogin} id="score" placeholder="Score Logged" />
                           </FormGroup>
                       </Form>
                   </ModalBody>
                   <ModalFooter>
                       <Button className="float-right" onClick={this.addScore}  theme="info">Add</Button>
                   </ModalFooter>
               </Modal>
               <h2> Leaderboard1 <a onClick={this.toggle} href="#">+</a></h2>
               <table>
                   {this.state.scores }
               </table>

           </div>
        );
    }
}

export default LeaderboardObject