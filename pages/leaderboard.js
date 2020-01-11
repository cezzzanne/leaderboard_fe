import React from 'react'
import Link from 'next/link'
import { Form, FormInput, FormGroup, Button } from "shards-react";
import LeaderboardObject from "../components/leaderboardObject";

class Leaderboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {teamName: '', leaderBoard: null};
        this.addTeam = this.addTeam.bind(this);
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
        const teamName = localStorage.getItem('teamName');
        const teamID = localStorage.getItem('teamID');
        this.setState({teamName});
        console.log(teamName);
        fetch('http://127.0.0.1:8000/api/leaderboard/' + teamID,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                }
            }).then(async (res) => {
            const data = await res.json();
            this.setState({leaderBoard: <LeaderboardObject data={data.leaderboard.team}/>});
        }).catch((error) => {
            this.setState({loading: false});
        });
    }



    render() {
        return (
            <html>
            <head>
                <title> leaderboard </title>
                <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet"
                      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
                      crossOrigin="anonymous" />
            </head>
            <body>
          <div className="container">
              <div style={{marginBottom: '1px solid gray', minHeight: '5vh', marginTop: 30}} className="row text-center">
                  <h3>{this.state.teamName}</h3>
              </div>
              <div style={{marginTop: '4vh'}}>
                  { this.state.leaderBoard}
              </div>
          </div>


          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
                  integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
                  crossOrigin="anonymous"></script>
            </body>
            </html>
        );
    }
}

export default Leaderboard